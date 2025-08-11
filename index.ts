import NoSleep from "./nosleep/nosleep.js";

// --- START: Type Definitions ---
// (No changes needed here)
interface BatteryManager extends EventTarget {
  readonly charging: boolean;
  readonly chargingTime: number;
  readonly dischargingTime: number;
  readonly level: number;
  onchargingchange: ((this: BatteryManager, ev: Event) => any) | null;
  onchargingtimechange: ((this: BatteryManager, ev: Event) => any) | null;
  ondischargingtimechange: ((this: BatteryManager, ev: Event) => any) | null;
  onlevelchange: ((this: BatteryManager, ev: Event) => any) | null;
}
interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
  prompt(): Promise<void>;
}
declare global {
  interface Navigator {
    getBattery?(): Promise<BatteryManager>;
  }
  var bootstrap: any;
  interface WindowEventMap {
    beforeinstallprompt: BeforeInstallPromptEvent;
    appinstalled: Event;
  }
}
interface TodoItem {
  id: number;
  text: string;
  completed: boolean;
}
type PomodoroMode = "pomodoro" | "shortBreak" | "longBreak";
interface PomodoroState {
  mode: PomodoroMode;
  remainingTime: number;
  isRunning: boolean;
  lastTickTimestamp?: number;
}
interface ElementClassMap {
  [className: string]: (HTMLElement | null)[];
}
interface ClassesToAddAndRemove {
  toAdd?: ElementClassMap;
  toRemove?: ElementClassMap;
}
interface WidgetPosition {
  top: string;
  left: string;
}
// --- END: Type Definitions ---

// --- DOM Element Variables ---
// (No changes needed here)
let heroSection: HTMLElement | null = null,
  navbar: HTMLElement | null = null,
  statusText: HTMLElement | null = null,
  favicon: HTMLLinkElement | null = null,
  keepAwakeSwitch: HTMLInputElement | null = null,
  digitalClockElement: HTMLElement | null = null,
  userGreetingElement: HTMLElement | null = null,
  clockFormatSwitch: HTMLInputElement | null = null,
  // Widget Toggles
  showClockWidgetSwitch: HTMLInputElement | null = null,
  showPomodoroWidgetSwitch: HTMLInputElement | null = null,
  showBatteryWidgetSwitch: HTMLInputElement | null = null,
  showTodoWidgetSwitch: HTMLInputElement | null = null,
  minimalModeSwitch: HTMLInputElement | null = null,
  // Dropdown Buttons
  copyLinkButton: HTMLButtonElement | null = null,
  shareButton: HTMLButtonElement | null = null,
  editNameButton: HTMLButtonElement | null = null,
  installPWAItem: HTMLLIElement | null = null,
  installPWAButton: HTMLButtonElement | null = null,
  // Modals
  namePromptModalElement: HTMLElement | null = null,
  userNameInputElement: HTMLInputElement | null = null,
  submitNameButtonElement: HTMLButtonElement | null = null,
  nameInputErrorElement: HTMLElement | null = null,
  namePromptModalInstance: any | null = null,
  helpModalElement: HTMLElement | null = null,
  // Widget Elements
  digitalClockWidgetElement: HTMLElement | null = null,
  widgetDigitalDateDisplayElement: HTMLElement | null = null,
  widgetDigitalTimeDisplayElement: HTMLElement | null = null,
  batteryWidgetElement: HTMLElement | null = null,
  batteryLevelElement: HTMLElement | null = null,
  batteryPercentageValueElement: HTMLElement | null = null,
  batteryChargingStatusElement: HTMLElement | null = null,
  batteryLowStatusElement: HTMLElement | null = null,
  todoWidgetElement: HTMLElement | null = null,
  todoListElement: HTMLElement | null = null,
  newTodoInputElement: HTMLInputElement | null = null,
  addTodoButtonElement: HTMLButtonElement | null = null,
  todoResizeHandleElement: HTMLElement | null = null,
  pomodoroWidgetElement: HTMLElement | null = null,
  pomodoroModeButtons: NodeListOf<HTMLButtonElement> | null = null,
  pomodoroTimeDisplayElement: HTMLElement | null = null,
  startPomodoroButtonElement: HTMLButtonElement | null = null,
  pausePomodoroButtonElement: HTMLButtonElement | null = null,
  resetPomodoroButtonElement: HTMLButtonElement | null = null,
  // Pomodoro Finished Alert Modal Elements
  pomodoroFinishedSoundElement: HTMLAudioElement | null = null,
  pomodoroFinishedAlertModalElement: HTMLElement | null = null,
  pomodoroFinishedAlertModalInstance: any | null = null,
  pomodoroFinishedAlertModalLabelElement: HTMLElement | null = null,
  pomodoroFinishedAlertMessageElement: HTMLElement | null = null,
  // Other Elements
  infoDisclaimerElement: HTMLElement | null = null;

// --- State Variables ---
// (No changes needed here)
let nosleep = new NoSleep(),
  userName: string | null = null,
  clockInterval: number | null = null,
  is12HourFormat = false,
  clockWidgetVisible = true,
  pomodoroVisible = true,
  batteryVisible = true,
  todoVisible = true,
  minimalModeActive = false,
  deferredInstallPrompt: BeforeInstallPromptEvent | null = null,
  isDraggingClock = false,
  clockOffsetX = 0,
  clockOffsetY = 0,
  isDraggingBattery = false,
  batteryOffsetX = 0,
  batteryOffsetY = 0,
  isDraggingTodo = false,
  todoOffsetX = 0,
  todoOffsetY = 0,
  isDraggingPomodoro = false,
  pomodoroOffsetX = 0,
  pomodoroOffsetY = 0,
  isResizingTodo = false,
  initialTodoWidth = 0,
  initialTodoHeight = 0,
  initialMouseX = 0,
  initialMouseY = 0,
  navbarHeight = 0;
let todos: TodoItem[] = [];
let pomodoroMode: PomodoroMode = "pomodoro",
  pomodoroTotalDuration: number = 25 * 60,
  pomodoroRemainingTime: number = pomodoroTotalDuration,
  pomodoroInterval: number | null = null,
  isPomodoroRunning: boolean = false;

// --- Constants ---
const LSK = {
  userName: "stayAwakeUserName",
  clockFormat: "stayAwakeClockFormat",
  clockWidgetVisible: "stayAwakeClockWidgetVisible",
  pomodoroVisible: "stayAwakePomodoroVisible",
  batteryVisible: "stayAwakeBatteryVisible",
  todoVisible: "stayAwakeTodoVisible",
  minimalModeActive: "stayAwakeMinimalMode",
  todos: "stayAwakeTodos",
  pomodoroState: "stayAwakePomodoroState",
  clockWidgetPos: "stayAwakeClockWidgetPos",
  batteryPos: "stayAwakeBatteryPos",
  todoPos: "stayAwakeTodoPos",
  pomodoroPos: "stayAwakePomodoroPos",
};
const SITE_URL = window.location.href;
const SITE_TITLE = document.title;
const MIN_WIDGET_WIDTH = 250;
const MIN_WIDGET_HEIGHT = 180;
const WIDGET_POSITION_PADDING = 10;
const POMODORO_DURATION = 25 * 60;
const SHORT_BREAK_DURATION = 5 * 60;
const LONG_BREAK_DURATION = 15 * 60;
const POMODORO_FINISHED_SOUND_URL =
  "https://pomofocus.io/audios/alarms/alarm-wood.mp3";
// <<< START: ADDED FOR BMC WIDGET >>>
const BMC_AWAKE_COLOR = "#40DCA5";
const BMC_SLEEPY_COLOR = "#008dd5";
// <<< END: ADDED FOR BMC WIDGET >>>

// --- Utility: Safe Element Access ---
function ensureElements(elements: {
  [key: string]:
  | HTMLElement
  | null
  | NodeListOf<HTMLElement>
  | NodeListOf<HTMLButtonElement>;
}): boolean {
  for (const key in elements) {
    const el = elements[key];
    if (!el || (el instanceof NodeList && el.length === 0)) {
      console.error(
        `Initialization failed: Element(s) for '${key}' not found.`
      );
      return false;
    }
  }
  return true;
}

// --- Error Handling ---
function handleNoSleepError(err: Error | unknown) {
  let message = "NoSleep Error";
  if (err instanceof Error) {
    message += `: ${err.name}, ${err.message}`;
  } else {
    message += ": Unknown error occurred.";
  }
  console.error(message, err);
  if (keepAwakeSwitch) {
    keepAwakeSwitch.checked = false;
    changeBackground(false);
    changeStatusText(false);
    changeFavicon(false);
  }
}

// --- UI Toggling & Core Logic ---

// <<< START: NEW FUNCTION FOR BMC WIDGET >>>
/**
 * Updates the background color of the 'Buy Me a Coffee' widget button.
 * @param isAwake - The current state of the main switch.
 */
function updateBmcWidgetColor(isAwake: boolean) {
  // The BMC widget script creates a div with the ID 'bmc-wbtn'.
  const bmcButton = document.getElementById("bmc-wbtn") as HTMLElement | null;
  if (bmcButton) {
    // The color is controlled by the 'background-color' style property.
    bmcButton.style.backgroundColor = isAwake
      ? BMC_AWAKE_COLOR
      : BMC_SLEEPY_COLOR;
  }
}
// <<< END: NEW FUNCTION FOR BMC WIDGET >>>

function changeSwitch(event: Event) {
  const target = event.target as HTMLInputElement;
  if (target?.checked !== undefined) {
    const isChecked = target.checked;
    const action = isChecked
      ? nosleep.enable()
      : Promise.resolve(nosleep.disable());
    action
      .then(() => {
        changeBackground(isChecked);
        changeStatusText(isChecked);
        changeFavicon(isChecked);
        updatePomodoroModeButtonsUI();
      })
      .catch((err) => {
        handleNoSleepError(err);
        if (keepAwakeSwitch) {
          keepAwakeSwitch.checked = false;
        }
      });
  }
}
function changeBackground(isAwake: boolean) {
  const baseHighlightTargets: (HTMLElement | null)[] = [];
  if (navbar)
    baseHighlightTargets.push(navbar.querySelector(".navbar-brand span"));
  if (userGreetingElement)
    baseHighlightTargets.push(userGreetingElement.querySelector(".user-name"));
  const disclaimerHighlightSpan = infoDisclaimerElement?.querySelector("span");
  if (disclaimerHighlightSpan instanceof HTMLElement)
    baseHighlightTargets.push(disclaimerHighlightSpan);
  const uniqueTextHighlights = Array.from(
    new Set(baseHighlightTargets.filter((el): el is HTMLElement => el !== null))
  );
  const icons: (HTMLElement | null)[] = [];
  [
    digitalClockWidgetElement,
    batteryWidgetElement,
    todoWidgetElement,
    pomodoroWidgetElement,
  ].forEach((widget) => {
    if (widget) icons.push(widget.querySelector(".widget-header .widget-icon"));
  });
  const generalButtons: (HTMLElement | null)[] = [
    addTodoButtonElement,
    startPomodoroButtonElement,
  ];
  const statusElement = [statusText];
  const classToAdd = isAwake ? "background-enabled" : "background-disabled";
  const classToRemove = isAwake ? "background-disabled" : "background-enabled";
  document.documentElement.classList.add(classToAdd);
  document.documentElement.classList.remove(classToRemove);
  const highlightClassMap: ClassesToAddAndRemove = isAwake
    ? {
      toAdd: {
        "highlight-text": [...uniqueTextHighlights, ...statusElement],
        "icon-highlight-primary": icons,
        "button-bg-primary": generalButtons,
      },
      toRemove: {
        "secondary-highlight-text": [
          ...uniqueTextHighlights,
          ...statusElement,
        ],
        "icon-highlight-secondary": icons,
        "button-bg-secondary": generalButtons,
      },
    }
    : {
      toAdd: {
        "secondary-highlight-text": [
          ...uniqueTextHighlights,
          ...statusElement,
        ],
        "icon-highlight-secondary": icons,
        "button-bg-secondary": generalButtons,
      },
      toRemove: {
        "highlight-text": [...uniqueTextHighlights, ...statusElement],
        "icon-highlight-primary": icons,
        "button-bg-primary": generalButtons,
      },
    };
  addRemoveClassesOfMultipleElements(highlightClassMap);
  updatePomodoroModeButtonsUI();
  // <<< START: ADDED CALL FOR BMC WIDGET >>>
  updateBmcWidgetColor(isAwake);
  // <<< END: ADDED CALL FOR BMC WIDGET >>>
}
function changeStatusText(isAwake: boolean) {
  if (statusText) {
    statusText.innerText = isAwake ? "Awake" : "Almost sleepy";
    statusText.classList.toggle("highlight-text", isAwake);
    statusText.classList.toggle("secondary-highlight-text", !isAwake);
  }
}
function changeFavicon(isAwake: boolean) {
  if (favicon) {
    favicon.href = isAwake
      ? "./favicon/favicon_green.ico"
      : "./favicon/favicon_blue.ico";
  }
}
function getGreetingPrefix(): string {
  const h = new Date().getHours();
  return h >= 5 && h < 12
    ? "Good Morning"
    : h >= 12 && h < 18
      ? "Good Afternoon"
      : h >= 18 && h < 24
        ? "Good Evening"
        : "Welcome Back";
}
function updateGreeting() {
  if (userGreetingElement && userName) {
    userGreetingElement.innerHTML = `${getGreetingPrefix()}, <span class="user-name">${userName}</span>!`;
    if (keepAwakeSwitch) changeBackground(keepAwakeSwitch.checked);
  } else if (userGreetingElement) {
    userGreetingElement.innerHTML = getGreetingPrefix() + "!";
  }
}
// ... (The rest of the file remains the same until initializeApp)
function formatTimePart(d: Date, h12: boolean): string {
  return d.toLocaleTimeString(h12 ? "en-US" : "en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: h12,
  });
}
function formatDatePart(d: Date): string {
  return d.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
function updateClock() {
  const now = new Date();
  const formattedTime = formatTimePart(now, is12HourFormat);
  const formattedDate = formatDatePart(now);
  const fullDateTimeString = `${formattedDate}, ${formattedTime}`;
  if (digitalClockElement) {
    digitalClockElement.innerText = fullDateTimeString;
  }
  if (widgetDigitalDateDisplayElement) {
    widgetDigitalDateDisplayElement.innerText = formattedDate;
  }
  if (widgetDigitalTimeDisplayElement) {
    widgetDigitalTimeDisplayElement.innerText = formattedTime;
  }
  if (now.getMinutes() === 0 && now.getSeconds() === 0) {
    updateGreeting();
  }
}
function handleClockFormatToggle(e: Event) {
  const t = e.target as HTMLInputElement;
  if (t) {
    is12HourFormat = t.checked;
    localStorage.setItem(LSK.clockFormat, is12HourFormat ? "12h" : "24h");
    updateClock();
  }
}

// --- Widget Visibility ---
// (No changes needed here)
function applyAllWidgetVisibilities() {
  const hideAllWidgets = minimalModeActive;
  const shouldShowClock = !hideAllWidgets && clockWidgetVisible;
  const shouldShowPomodoro = !hideAllWidgets && pomodoroVisible;
  const shouldShowBattery = !hideAllWidgets && batteryVisible;
  const shouldShowTodo = !hideAllWidgets && todoVisible;
  digitalClockWidgetElement?.classList.toggle(
    "widget-hidden",
    !shouldShowClock
  );
  pomodoroWidgetElement?.classList.toggle("widget-hidden", !shouldShowPomodoro);
  batteryWidgetElement?.classList.toggle("widget-hidden", !shouldShowBattery);
  todoWidgetElement?.classList.toggle("widget-hidden", !shouldShowTodo);
  const disableIndividualToggles = minimalModeActive;
  [
    showClockWidgetSwitch,
    showPomodoroWidgetSwitch,
    showBatteryWidgetSwitch,
    showTodoWidgetSwitch,
  ].forEach((widgetSwitch) => {
    if (widgetSwitch) {
      widgetSwitch.disabled = disableIndividualToggles;
      widgetSwitch
        .closest(".form-check")
        ?.classList.toggle("opacity-50", disableIndividualToggles);
    }
  });
  if (shouldShowPomodoro) {
    updatePomodoroDisplay();
  } else {
    if (document.title.includes("Focus") || document.title.includes("Break")) {
      document.title = SITE_TITLE;
    }
  }
}
function handleShowClockToggle(event: Event) {
  const target = event.target as HTMLInputElement;
  if (target) {
    clockWidgetVisible = target.checked;
    localStorage.setItem(
      LSK.clockWidgetVisible,
      clockWidgetVisible ? "true" : "false"
    );
    applyAllWidgetVisibilities();
  }
}
function handleShowPomodoroToggle(event: Event) {
  const target = event.target as HTMLInputElement;
  if (target) {
    pomodoroVisible = target.checked;
    localStorage.setItem(
      LSK.pomodoroVisible,
      pomodoroVisible ? "true" : "false"
    );
    applyAllWidgetVisibilities();
  }
}
function handleShowBatteryToggle(event: Event) {
  const target = event.target as HTMLInputElement;
  if (target) {
    batteryVisible = target.checked;
    localStorage.setItem(LSK.batteryVisible, batteryVisible ? "true" : "false");
    applyAllWidgetVisibilities();
  }
}
function handleShowTodoToggle(event: Event) {
  const target = event.target as HTMLInputElement;
  if (target) {
    todoVisible = target.checked;
    localStorage.setItem(LSK.todoVisible, todoVisible ? "true" : "false");
    applyAllWidgetVisibilities();
  }
}
function handleMinimalModeToggle(event: Event) {
  const target = event.target as HTMLInputElement;
  if (target) {
    minimalModeActive = target.checked;
    localStorage.setItem(
      LSK.minimalModeActive,
      minimalModeActive ? "true" : "false"
    );
    applyAllWidgetVisibilities();
  }
}

// --- Name Prompt & Edit ---
// (No changes needed here)
function handleNameSubmit() {
  const n = userNameInputElement?.value.trim();
  if (n && userNameInputElement && nameInputErrorElement) {
    userName = n;
    localStorage.setItem(LSK.userName, n);
    updateGreeting();
    nameInputErrorElement.classList.add("d-none");
    userNameInputElement.classList.remove("is-invalid");
    namePromptModalInstance?.hide();
  } else if (userNameInputElement && nameInputErrorElement) {
    nameInputErrorElement.classList.remove("d-none");
    userNameInputElement.classList.add("is-invalid");
    userNameInputElement.focus();
  }
}
function initializeAndMaybeShowNamePrompt(show: boolean = false) {
  namePromptModalElement = document.getElementById("namePromptModal");
  userNameInputElement = document.getElementById(
    "userNameInput"
  ) as HTMLInputElement | null;
  submitNameButtonElement = document.getElementById(
    "submitNameButton"
  ) as HTMLButtonElement | null;
  nameInputErrorElement = document.getElementById("nameInputError");

  if (
    ensureElements({
      namePromptModalElement,
      userNameInputElement,
      submitNameButtonElement,
      nameInputErrorElement,
    })
  ) {
    if (!namePromptModalInstance) {
      namePromptModalInstance = bootstrap.Modal.getOrCreateInstance(
        namePromptModalElement!
      );
      submitNameButtonElement!.addEventListener("click", handleNameSubmit);
      userNameInputElement!.addEventListener("keypress", handleEnterKey);
      namePromptModalElement!.addEventListener("shown.bs.modal", () =>
        userNameInputElement?.focus()
      );
    }
    if (show) {
      userNameInputElement!.value = "";
      nameInputErrorElement?.classList.add("d-none");
      userNameInputElement!.classList.remove("is-invalid");
      namePromptModalInstance?.show();
    }
  } else {
    console.error("Cannot initialize name prompt: Modal elements missing.");
    if (!userName) {
      updateGreeting();
    }
  }
}
function handleEnterKey(e: KeyboardEvent) {
  if (e.key === "Enter" && userNameInputElement === document.activeElement) {
    e.preventDefault();
    handleNameSubmit();
  }
}
function handleEditNameClick() {
  if (namePromptModalInstance && userNameInputElement) {
    userNameInputElement.value = userName || "";
    nameInputErrorElement?.classList.add("d-none");
    userNameInputElement.classList.remove("is-invalid");
    namePromptModalInstance.show();
  } else {
    console.error(
      "Cannot open edit name modal: Instance or input element not found."
    );
    initializeAndMaybeShowNamePrompt(true);
  }
}

// ... (The rest of the file remains the same until initializeApp)
// --- Battery Functions ---
function updateBatteryUI(battery: BatteryManager) {
  if (
    !batteryLevelElement ||
    !batteryPercentageValueElement ||
    !batteryChargingStatusElement ||
    !batteryLowStatusElement
  )
    return;
  const level = battery.level;
  const percentage = Math.round(level * 100);
  const isCharging = battery.charging;
  const isLow = !isCharging && level <= 0.2;
  batteryPercentageValueElement.innerText = percentage.toString();
  batteryLevelElement.style.height = `${percentage}%`;
  batteryLevelElement.classList.remove(
    "level-low",
    "level-medium",
    "level-high"
  );
  if (level <= 0.2) batteryLevelElement.classList.add("level-low");
  else if (level <= 0.5) batteryLevelElement.classList.add("level-medium");
  else batteryLevelElement.classList.add("level-high");
  batteryChargingStatusElement.style.display = isCharging ? "block" : "none";
  batteryLowStatusElement.style.display = isLow ? "block" : "none";
}
function initializeBatteryIndicator() {
  if ("getBattery" in navigator && typeof navigator.getBattery === "function") {
    navigator
      .getBattery()
      .then((batteryManager: BatteryManager) => {
        batteryWidgetElement = document.getElementById("battery-widget");
        batteryLevelElement = document.getElementById("battery-level");
        batteryPercentageValueElement = document.getElementById(
          "battery-percentage-value"
        );
        batteryChargingStatusElement = document.getElementById(
          "battery-charging-status"
        );
        batteryLowStatusElement = document.getElementById("battery-low-status");
        if (
          ensureElements({
            batteryWidgetElement,
            batteryLevelElement,
            batteryPercentageValueElement,
            batteryChargingStatusElement,
            batteryLowStatusElement,
          })
        ) {
          updateBatteryUI(batteryManager);
          batteryManager.addEventListener("levelchange", () =>
            updateBatteryUI(batteryManager)
          );
          batteryManager.addEventListener("chargingchange", () =>
            updateBatteryUI(batteryManager)
          );
          const header = batteryWidgetElement!.querySelector(
            ".widget-header"
          ) as HTMLElement | null;
          if (header)
            header.addEventListener("pointerdown", handleBatteryPointerDown);
          else console.error("Battery widget header not found!");
        } else {
          console.error("Battery widget init failed: elements missing.");
          if (batteryWidgetElement)
            batteryWidgetElement.classList.add("widget-hidden");
        }
      })
      .catch((error: unknown) => {
        let message = "Battery API error";
        if (error instanceof Error) message += `: ${error.message}`;
        console.error(message, error);
        const widget = document.getElementById("battery-widget");
        if (widget) widget.classList.add("widget-hidden");
        if (showBatteryWidgetSwitch) {
          showBatteryWidgetSwitch.checked = false;
          showBatteryWidgetSwitch.disabled = true;
          showBatteryWidgetSwitch
            .closest(".form-check")
            ?.classList.add("opacity-50");
          batteryVisible = false;
          localStorage.setItem(LSK.batteryVisible, "false");
          applyAllWidgetVisibilities();
        }
      });
  } else {
    console.warn("Battery API not supported.");
    const widget = document.getElementById("battery-widget");
    if (widget) widget.classList.add("widget-hidden");
    if (showBatteryWidgetSwitch) {
      showBatteryWidgetSwitch.checked = false;
      showBatteryWidgetSwitch.disabled = true;
      showBatteryWidgetSwitch
        .closest(".form-check")
        ?.classList.add("opacity-50");
      batteryVisible = false;
      localStorage.setItem(LSK.batteryVisible, "false");
      applyAllWidgetVisibilities();
    }
  }
}

// --- To-Do List Functions ---
function loadTodos() {
  const s = localStorage.getItem(LSK.todos);
  try {
    if (s) {
      const p = JSON.parse(s);
      if (
        Array.isArray(p) &&
        p.every(
          (i): i is TodoItem =>
            typeof i === "object" &&
            i !== null &&
            typeof i.id === "number" &&
            typeof i.text === "string" &&
            typeof i.completed === "boolean"
        )
      ) {
        todos = p;
      } else {
        console.warn("Invalid To-Do data. Resetting.");
        todos = [];
        localStorage.removeItem(LSK.todos);
      }
    } else {
      todos = [];
    }
  } catch (e) {
    console.error("Error parsing todos:", e);
    todos = [];
    localStorage.removeItem(LSK.todos);
  }
}
function saveTodos() {
  try {
    localStorage.setItem(LSK.todos, JSON.stringify(todos));
  } catch (e) {
    console.error("Error saving todos:", e);
  }
}
function renderTodos() {
  if (!todoListElement) {
    console.error("Cannot render todos: todoListElement not found.");
    return;
  }
  todoListElement.innerHTML = "";
  if (todos.length === 0) {
    const li = document.createElement("li");
    li.textContent = "No tasks yet!";
    li.style.textAlign = "center";
    li.style.color = "var(--text-dim)";
    li.style.padding = "10px 0";
    todoListElement!.appendChild(li);
    return;
  }
  todos.forEach((todo) => {
    const li = document.createElement("li");
    li.className = "todo-item";
    li.dataset.id = String(todo.id);
    if (todo.completed) {
      li.classList.add("completed");
    }
    const cb = document.createElement("input");
    cb.type = "checkbox";
    cb.checked = todo.completed;
    cb.addEventListener("change", () => toggleTodo(todo.id));
    cb.setAttribute(
      "aria-label",
      `Mark task "${todo.text}" as ${todo.completed ? "incomplete" : "complete"
      }`
    );
    const span = document.createElement("span");
    span.textContent = todo.text;
    const btn = document.createElement("button");
    btn.className = "delete-todo-btn";
    btn.innerHTML = '<i class="fas fa-trash-alt" aria-hidden="true"></i>';
    btn.title = `Delete task "${todo.text}"`;
    btn.setAttribute("aria-label", `Delete task "${todo.text}"`);
    btn.addEventListener("click", () => deleteTodo(todo.id));
    li.append(cb, span, btn);
    todoListElement!.appendChild(li);
  });
}
function addTodo() {
  const t = newTodoInputElement?.value.trim();
  if (t && newTodoInputElement) {
    todos.push({ id: Date.now(), text: t, completed: false });
    saveTodos();
    renderTodos();
    newTodoInputElement.value = "";
    newTodoInputElement.focus();
  } else if (newTodoInputElement) {
    newTodoInputElement.focus();
  }
}
function toggleTodo(id: number) {
  todos = todos.map((t) =>
    t.id === id ? { ...t, completed: !t.completed } : t
  );
  saveTodos();
  renderTodos();
}
function deleteTodo(id: number) {
  todos = todos.filter((t) => t.id !== id);
  saveTodos();
  renderTodos();
}
function initializeTodoList() {
  todoWidgetElement = document.getElementById("todo-widget");
  todoListElement = document.getElementById(
    "todo-list"
  ) as HTMLUListElement | null;
  newTodoInputElement = document.getElementById(
    "new-todo-input"
  ) as HTMLInputElement | null;
  addTodoButtonElement = document.getElementById(
    "add-todo-button"
  ) as HTMLButtonElement | null;
  if (todoWidgetElement) {
    todoResizeHandleElement = todoWidgetElement.querySelector(
      ".widget-resize-handle"
    ) as HTMLElement | null;
    if (
      ensureElements({
        todoWidgetElement,
        todoListElement,
        newTodoInputElement,
        addTodoButtonElement,
        todoResizeHandleElement,
      })
    ) {
      loadTodos();
      renderTodos();
      addTodoButtonElement!.addEventListener("click", addTodo);
      newTodoInputElement!.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
          event.preventDefault();
          addTodo();
        }
      });
      const header = todoWidgetElement.querySelector(
        ".widget-header"
      ) as HTMLElement | null;
      if (header) header.addEventListener("pointerdown", handleTodoPointerDown);
      else console.error("To-Do widget header not found!");
      todoResizeHandleElement!.addEventListener(
        "pointerdown",
        handleTodoResizePointerDown
      );
    } else {
      console.error("To-Do init failed: elements missing.");
      if (todoWidgetElement) todoWidgetElement.classList.add("widget-hidden");
    }
  } else {
    console.error("To-Do widget not found.");
  }
}

// --- Pomodoro Timer Functions ---
function formatPomodoroTime(s: number): string {
  const m = Math.floor(s / 60);
  const c = s % 60;
  return `${String(m).padStart(2, "0")}:${String(c).padStart(2, "0")}`;
}
function updatePomodoroDisplay() {
  if (pomodoroTimeDisplayElement) {
    pomodoroTimeDisplayElement.innerText = formatPomodoroTime(
      pomodoroRemainingTime
    );
    const isPomodoroWidgetVisible =
      !pomodoroWidgetElement?.classList.contains("widget-hidden");
    if (isPomodoroRunning && isPomodoroWidgetVisible) {
      const modeText = pomodoroMode === "pomodoro" ? "Focus" : "Break";
      document.title = `${formatPomodoroTime(
        pomodoroRemainingTime
      )} - ${modeText} | ${SITE_TITLE}`;
    } else {
      if (document.title !== SITE_TITLE) {
        document.title = SITE_TITLE;
      }
    }
  }
}
function updatePomodoroControls() {
  if (
    !startPomodoroButtonElement ||
    !pausePomodoroButtonElement ||
    !resetPomodoroButtonElement
  )
    return;
  const ss = !isPomodoroRunning;
  const sp = isPomodoroRunning;
  const sr =
    sp || (!isPomodoroRunning && pomodoroRemainingTime < pomodoroTotalDuration);
  startPomodoroButtonElement.style.display = ss ? "inline-block" : "none";
  pausePomodoroButtonElement.style.display = sp ? "inline-block" : "none";
  resetPomodoroButtonElement.style.display = sr ? "inline-block" : "none";
}
function savePomodoroState() {
  const s: PomodoroState = {
    mode: pomodoroMode,
    remainingTime: pomodoroRemainingTime,
    isRunning: isPomodoroRunning,
    lastTickTimestamp: isPomodoroRunning ? Date.now() : undefined,
  };
  try {
    localStorage.setItem(LSK.pomodoroState, JSON.stringify(s));
  } catch (e) {
    console.error("Error saving Pomodoro state:", e);
  }
}
function loadPomodoroState() {
  const j = localStorage.getItem(LSK.pomodoroState);
  let l = false;
  if (j) {
    try {
      const s: PomodoroState = JSON.parse(j);
      if (
        s &&
        typeof s === "object" &&
        ["pomodoro", "shortBreak", "longBreak"].includes(s.mode) &&
        typeof s.remainingTime === "number" &&
        typeof s.isRunning === "boolean" &&
        (s.lastTickTimestamp === undefined ||
          typeof s.lastTickTimestamp === "number")
      ) {
        pomodoroMode = s.mode;
        pomodoroRemainingTime = s.remainingTime;
        isPomodoroRunning = s.isRunning;
        if (isPomodoroRunning && s.lastTickTimestamp) {
          const n = Date.now();
          const e = Math.floor((n - s.lastTickTimestamp) / 1000);
          pomodoroRemainingTime = Math.max(0, pomodoroRemainingTime - e);
          if (pomodoroRemainingTime === 0) {
            isPomodoroRunning = false;
            console.log(`Pomodoro (${pomodoroMode}) finished while inactive.`);
            pomodoroTotalDuration = getDurationForMode(pomodoroMode);
            pomodoroRemainingTime = pomodoroTotalDuration;
          }
        } else if (!isPomodoroRunning && pomodoroRemainingTime <= 0) {
          pomodoroTotalDuration = getDurationForMode(pomodoroMode);
          pomodoroRemainingTime = pomodoroTotalDuration;
        }
        pomodoroTotalDuration = getDurationForMode(pomodoroMode);
        pomodoroRemainingTime = Math.min(
          pomodoroRemainingTime,
          pomodoroTotalDuration
        );
        l = true;
      } else {
        console.warn("Invalid Pomodoro state. Resetting.");
        localStorage.removeItem(LSK.pomodoroState);
      }
    } catch (e) {
      console.error("Error parsing Pomodoro state:", e);
      localStorage.removeItem(LSK.pomodoroState);
    }
  }
  if (!l) {
    pomodoroMode = "pomodoro";
    pomodoroTotalDuration = POMODORO_DURATION;
    pomodoroRemainingTime = POMODORO_DURATION;
    isPomodoroRunning = false;
  }
  updatePomodoroDisplay();
  updatePomodoroModeButtonsUI();
  updatePomodoroControls();
  if (isPomodoroRunning && pomodoroRemainingTime > 0) {
    startPomodoroTimer(false);
  }
}
function getDurationForMode(m: PomodoroMode): number {
  switch (m) {
    case "pomodoro":
      return POMODORO_DURATION;
    case "shortBreak":
      return SHORT_BREAK_DURATION;
    case "longBreak":
      return LONG_BREAK_DURATION;
    default:
      console.warn(`Unknown Pomodoro mode: ${m}. Using default duration.`);
      return POMODORO_DURATION;
  }
}
function updatePomodoroModeButtonsUI() {
  if (!pomodoroModeButtons) return;
  const isAwakeActive = keepAwakeSwitch?.checked ?? true;
  pomodoroModeButtons.forEach((b) => {
    const isCurrentMode = b.dataset.mode === pomodoroMode;
    b.classList.toggle("active", isCurrentMode);
    b.classList.toggle("secondary-active", isCurrentMode && !isAwakeActive);
  });
}
function switchPomodoroMode(nm: PomodoroMode) {
  if (pomodoroMode === nm && !isPomodoroRunning) {
    updatePomodoroModeButtonsUI();
    return;
  }
  pausePomodoroTimer(false);
  pomodoroMode = nm;
  pomodoroTotalDuration = getDurationForMode(nm);
  pomodoroRemainingTime = pomodoroTotalDuration;
  isPomodoroRunning = false;
  updatePomodoroDisplay();
  updatePomodoroModeButtonsUI();
  updatePomodoroControls();
  savePomodoroState();
}
function startPomodoroTimer(sv = true) {
  if (isPomodoroRunning || pomodoroRemainingTime <= 0) return;
  isPomodoroRunning = true;
  updatePomodoroControls();
  if (sv) savePomodoroState();
  if (pomodoroInterval) clearInterval(pomodoroInterval);
  const tick = () => {
    if (!isPomodoroRunning) {
      clearInterval(pomodoroInterval!);
      pomodoroInterval = null;
      return;
    }
    pomodoroRemainingTime--;
    updatePomodoroDisplay();
    if (pomodoroRemainingTime <= 0) {
      pomodoroFinishedSoundElement
        ?.play()
        .catch((err) => console.error("Error playing sound:", err));
      if (pomodoroFinishedAlertModalLabelElement) {
        pomodoroFinishedAlertModalLabelElement.textContent =
          pomodoroMode === "pomodoro"
            ? "Pomodoro Finished!"
            : pomodoroMode === "shortBreak"
              ? "Short Break Over!"
              : "Long Break Over!";
      }
      if (pomodoroFinishedAlertMessageElement) {
        pomodoroFinishedAlertMessageElement.textContent =
          pomodoroMode === "pomodoro"
            ? "Your Pomodoro session has ended. Time for a break!"
            : pomodoroMode === "shortBreak"
              ? "Your short break is over. Back to focus!"
              : "Your long break is over. Ready for the next session?";
      }
      pomodoroFinishedAlertModalInstance?.show();
      pausePomodoroTimer(false);
      console.log(`Pomodoro Timer (${pomodoroMode}) finished!`);
      pomodoroRemainingTime = pomodoroTotalDuration;
      updatePomodoroDisplay();
      updatePomodoroControls();
      savePomodoroState();
    } else if (pomodoroRemainingTime % 15 === 0) {
      savePomodoroState();
    }
  };
  tick();
  pomodoroInterval = window.setInterval(tick, 1000);
}
function pausePomodoroTimer(sv = true) {
  if (!isPomodoroRunning) return;
  if (pomodoroInterval) {
    clearInterval(pomodoroInterval);
    pomodoroInterval = null;
  }
  isPomodoroRunning = false;
  updatePomodoroControls();
  if (sv) savePomodoroState();
  if (document.title !== SITE_TITLE) {
    document.title = SITE_TITLE;
  }
}
function resetPomodoroTimer(sv = true) {
  pausePomodoroTimer(false);
  pomodoroRemainingTime = pomodoroTotalDuration;
  isPomodoroRunning = false;
  updatePomodoroDisplay();
  updatePomodoroControls();
  if (sv) savePomodoroState();
}
function initializePomodoroTimer() {
  pomodoroWidgetElement = document.getElementById("pomodoro-widget");
  pomodoroModeButtons = document.querySelectorAll(".pomodoro-mode-btn");
  pomodoroTimeDisplayElement = document.getElementById("pomodoro-time-display");
  startPomodoroButtonElement = document.getElementById(
    "start-pomodoro-btn"
  ) as HTMLButtonElement | null;
  pausePomodoroButtonElement = document.getElementById(
    "pause-pomodoro-btn"
  ) as HTMLButtonElement | null;
  resetPomodoroButtonElement = document.getElementById(
    "reset-pomodoro-btn"
  ) as HTMLButtonElement | null;
  pomodoroFinishedSoundElement = document.getElementById(
    "pomodoro-finished-sound"
  ) as HTMLAudioElement | null;
  pomodoroFinishedAlertModalElement = document.getElementById(
    "pomodoroFinishedAlertModal"
  );
  pomodoroFinishedAlertModalLabelElement = document.getElementById(
    "pomodoroFinishedAlertModalLabel"
  );
  pomodoroFinishedAlertMessageElement = document.getElementById(
    "pomodoroFinishedAlertMessage"
  );
  if (
    ensureElements({
      pomodoroWidgetElement,
      pomodoroModeButtons,
      pomodoroTimeDisplayElement,
      startPomodoroButtonElement,
      pausePomodoroButtonElement,
      resetPomodoroButtonElement,
      pomodoroFinishedSoundElement,
      pomodoroFinishedAlertModalElement,
      pomodoroFinishedAlertModalLabelElement,
      pomodoroFinishedAlertMessageElement,
    })
  ) {
    loadPomodoroState();
    pomodoroModeButtons!.forEach((button) => {
      button.addEventListener("click", () => {
        const mode = button.dataset.mode as PomodoroMode | undefined;
        if (mode) switchPomodoroMode(mode);
      });
    });
    startPomodoroButtonElement!.addEventListener("click", () =>
      startPomodoroTimer()
    );
    pausePomodoroButtonElement!.addEventListener("click", () =>
      pausePomodoroTimer()
    );
    resetPomodoroButtonElement!.addEventListener("click", () =>
      resetPomodoroTimer()
    );
    const header = pomodoroWidgetElement!.querySelector(
      ".widget-header"
    ) as HTMLElement | null;
    if (header)
      header.addEventListener("pointerdown", handlePomodoroPointerDown);
    else console.error("Pomodoro widget header not found!");
    if (pomodoroFinishedAlertModalElement) {
      pomodoroFinishedAlertModalInstance = new bootstrap.Modal(
        pomodoroFinishedAlertModalElement
      );
    }
    if (pomodoroFinishedSoundElement) {
      pomodoroFinishedSoundElement.src = POMODORO_FINISHED_SOUND_URL;
    }
  } else {
    console.error("Pomodoro init failed: elements missing.");
    if (pomodoroWidgetElement)
      pomodoroWidgetElement.classList.add("widget-hidden");
  }
}

// --- Clock Widget Initialization ---
function initializeDigitalClockWidget() {
  digitalClockWidgetElement = document.getElementById("digital-clock-widget");
  widgetDigitalDateDisplayElement = document.getElementById(
    "widget-digital-date-display"
  );
  widgetDigitalTimeDisplayElement = document.getElementById(
    "widget-digital-time-display"
  );
  if (
    ensureElements({
      digitalClockWidgetElement,
      widgetDigitalDateDisplayElement,
      widgetDigitalTimeDisplayElement,
    })
  ) {
    const header = digitalClockWidgetElement!.querySelector(
      ".widget-header"
    ) as HTMLElement | null;
    if (header) {
      header.addEventListener("pointerdown", handleClockPointerDown);
    } else {
      console.error("Digital Clock widget header not found!");
    }
  } else {
    console.error(
      "Digital Clock widget initialization failed: elements missing."
    );
    if (digitalClockWidgetElement)
      digitalClockWidgetElement.classList.add("widget-hidden");
  }
}

// --- Widget Position Persistence ---
function saveWidgetPosition(k: string, e: HTMLElement | null) {
  if (!e || !k) return;
  const s = window.getComputedStyle(e);
  const p: WidgetPosition = { top: s.top, left: s.left };
  if (p.top === "auto" || p.left === "auto") {
    return;
  }
  try {
    localStorage.setItem(k, JSON.stringify(p));
  } catch (e) {
    console.error(`Error saving ${k}:`, e);
  }
}
function loadWidgetPosition(
  k: string,
  e: HTMLElement | null,
  dT: string,
  dL: string,
  dR?: string
) {
  if (!e || !k) return;
  let p: WidgetPosition | null = null;
  const j = localStorage.getItem(k);
  if (j) {
    try {
      p = JSON.parse(j);
      if (
        !p ||
        typeof p.top !== "string" ||
        typeof p.left !== "string" ||
        p.top === "auto" ||
        p.left === "auto"
      ) {
        p = null;
        localStorage.removeItem(k);
      }
    } catch (e) {
      console.error(`Error parsing ${k}:`, e);
      localStorage.removeItem(k);
      p = null;
    }
  }
  e.style.top = p?.top ?? dT;
  e.style.left = p?.left ?? dL;
  if (e.style.left === "auto" && dR) {
    e.style.right = dR;
  } else {
    e.style.right = "auto";
  }
  requestAnimationFrame(() => {
    try {
      if (navbar) navbarHeight = navbar.offsetHeight;
      const r = e.getBoundingClientRect();
      if (r.width > 0 && r.height > 0) {
        let cT = r.top;
        let cL = r.left;
        const maxTop = window.innerHeight - r.height - WIDGET_POSITION_PADDING;
        const maxLeft = window.innerWidth - r.width - WIDGET_POSITION_PADDING;
        const minTop = navbarHeight + WIDGET_POSITION_PADDING;
        const minLeft = WIDGET_POSITION_PADDING;
        const clampedTop = Math.max(minTop, Math.min(maxTop, cT));
        const clampedLeft = Math.max(minLeft, Math.min(maxLeft, cL));
        if (clampedTop !== cT) {
          e.style.top = `${clampedTop}px`;
        }
        if (clampedLeft !== cL) {
          e.style.left = `${clampedLeft}px`;
          e.style.right = "auto";
        }
      }
    } catch (err) {
      console.error(`Error during clamping for ${k}:`, err);
    }
  });
  e.style.bottom = "auto";
  e.style.transform = "none";
}
function loadAllWidgetPositions() {
  const defaultClockTop = "400px";
  const defaultClockLeft = "20px";
  const defaultBatteryTop = "100px";
  const defaultBatteryRight = "20px";
  const defaultTodoTop = "100px";
  const defaultTodoLeft = "20px";
  const defaultPomodoroTop = "240px";
  const defaultPomodoroLeft = "20px";
  loadWidgetPosition(
    LSK.clockWidgetPos,
    digitalClockWidgetElement,
    defaultClockTop,
    defaultClockLeft
  );
  loadWidgetPosition(
    LSK.batteryPos,
    batteryWidgetElement,
    defaultBatteryTop,
    "auto",
    defaultBatteryRight
  );
  loadWidgetPosition(
    LSK.todoPos,
    todoWidgetElement,
    defaultTodoTop,
    defaultTodoLeft
  );
  loadWidgetPosition(
    LSK.pomodoroPos,
    pomodoroWidgetElement,
    defaultPomodoroTop,
    defaultPomodoroLeft
  );
}

// --- Dragging Logic ---
function startDragging(
  event: PointerEvent,
  element: HTMLElement | null,
  stateSetters: {
    setDragging: (isDragging: boolean) => void;
    setOffsetX: (offset: number) => void;
    setOffsetY: (offset: number) => void;
  },
  moveHandler: (event: PointerEvent) => void,
  upHandler: () => void
) {
  if (!element || !(event.target instanceof Node)) {
    return;
  }
  const targetElement = event.target as HTMLElement;
  const header = element.querySelector(".widget-header") as HTMLElement | null;
  const dragHandle = element.querySelector(
    ".widget-drag-handle"
  ) as HTMLElement | null;
  let canDrag = false;
  if (header && header.contains(targetElement)) {
    if (dragHandle) {
      canDrag = dragHandle.contains(targetElement) || targetElement === header;
    } else {
      canDrag = true;
    }
  }
  if (
    !canDrag ||
    targetElement.closest(
      "button, input, a, select, textarea, .widget-resize-handle"
    )
  ) {
    return;
  }
  event.preventDefault();
  try {
    element.setPointerCapture(event.pointerId);
  } catch (err) {
    console.error("Failed to capture pointer:", err);
    return;
  }
  stateSetters.setDragging(true);
  element.classList.add("dragging");
  document.body.style.cursor = "grabbing";
  document.body.style.userSelect = "none";
  if (navbar) navbarHeight = navbar.offsetHeight;
  const rect = element.getBoundingClientRect();
  stateSetters.setOffsetX(event.clientX - rect.left);
  stateSetters.setOffsetY(event.clientY - rect.top);
  document.addEventListener("pointermove", moveHandler);
  document.addEventListener("pointerup", upHandler, { once: true });
}
function dragMove(
  e: PointerEvent,
  el: HTMLElement | null,
  s: { isDragging: boolean; offsetX: number; offsetY: number }
) {
  if (!s.isDragging || !el) return;
  e.preventDefault();
  const w = el.offsetWidth,
    h = el.offsetHeight;
  let newTop = e.clientY - s.offsetY,
    newLeft = e.clientX - s.offsetX;
  const maxTop = window.innerHeight - h - WIDGET_POSITION_PADDING;
  const maxLeft = window.innerWidth - w - WIDGET_POSITION_PADDING;
  const minTop = navbarHeight + WIDGET_POSITION_PADDING;
  const minLeft = WIDGET_POSITION_PADDING;
  newTop = Math.max(minTop, Math.min(maxTop, newTop));
  newLeft = Math.max(minLeft, Math.min(maxLeft, newLeft));
  el.style.left = `${newLeft}px`;
  el.style.top = `${newTop}px`;
  el.style.right = "auto";
  el.style.bottom = "auto";
  el.style.transform = "none";
}
function stopDragging(
  element: HTMLElement | null,
  stateSetters: { setDragging: (isDragging: boolean) => void },
  moveHandler: (event: PointerEvent) => void,
  storageKey?: string,
  event?: PointerEvent
) {
  if (stateSetters) {
    stateSetters.setDragging(false);
  }
  if (element) {
    element.classList.remove("dragging");
    if (event?.pointerId) {
      try {
        element.releasePointerCapture(event.pointerId);
      } catch (err) { }
    }
    if (storageKey) {
      saveWidgetPosition(storageKey, element);
    }
  }
  document.body.style.cursor = "";
  document.body.style.userSelect = "";
  document.removeEventListener("pointermove", moveHandler);
}

// --- Drag Handlers (Clock, Battery, Todo, Pomodoro) ---
function handleClockPointerDown(event: PointerEvent) {
  startDragging(
    event,
    digitalClockWidgetElement,
    {
      setDragging: (v) => (isDraggingClock = v),
      setOffsetX: (v) => (clockOffsetX = v),
      setOffsetY: (v) => (clockOffsetY = v),
    },
    handleClockPointerMove,
    handleClockPointerUp
  );
}
function handleClockPointerMove(event: PointerEvent) {
  dragMove(event, digitalClockWidgetElement, {
    isDragging: isDraggingClock,
    offsetX: clockOffsetX,
    offsetY: clockOffsetY,
  });
}
function handleClockPointerUp(event?: PointerEvent) {
  stopDragging(
    digitalClockWidgetElement,
    { setDragging: (v) => (isDraggingClock = v) },
    handleClockPointerMove,
    LSK.clockWidgetPos,
    event
  );
}
function handleBatteryPointerDown(e: PointerEvent) {
  if (
    batteryWidgetElement &&
    window.getComputedStyle(batteryWidgetElement).left === "auto"
  ) {
    const rect = batteryWidgetElement.getBoundingClientRect();
    batteryWidgetElement.style.left = `${rect.left}px`;
    batteryWidgetElement.style.top = `${rect.top}px`;
    batteryWidgetElement.style.right = "auto";
  }
  startDragging(
    e,
    batteryWidgetElement,
    {
      setDragging: (v) => (isDraggingBattery = v),
      setOffsetX: (v) => (batteryOffsetX = v),
      setOffsetY: (v) => (batteryOffsetY = v),
    },
    handleBatteryPointerMove,
    handleBatteryPointerUp
  );
}
function handleBatteryPointerMove(e: PointerEvent) {
  dragMove(e, batteryWidgetElement, {
    isDragging: isDraggingBattery,
    offsetX: batteryOffsetX,
    offsetY: batteryOffsetY,
  });
}
function handleBatteryPointerUp(e?: PointerEvent) {
  stopDragging(
    batteryWidgetElement,
    { setDragging: (v) => (isDraggingBattery = v) },
    handleBatteryPointerMove,
    LSK.batteryPos,
    e
  );
}
function handleTodoPointerDown(e: PointerEvent) {
  startDragging(
    e,
    todoWidgetElement,
    {
      setDragging: (v) => (isDraggingTodo = v),
      setOffsetX: (v) => (todoOffsetX = v),
      setOffsetY: (v) => (todoOffsetY = v),
    },
    handleTodoPointerMove,
    handleTodoPointerUp
  );
}
function handleTodoPointerMove(e: PointerEvent) {
  dragMove(e, todoWidgetElement, {
    isDragging: isDraggingTodo,
    offsetX: todoOffsetX,
    offsetY: todoOffsetY,
  });
}
function handleTodoPointerUp(e?: PointerEvent) {
  stopDragging(
    todoWidgetElement,
    { setDragging: (v) => (isDraggingTodo = v) },
    handleTodoPointerMove,
    LSK.todoPos,
    e
  );
}
function handlePomodoroPointerDown(e: PointerEvent) {
  startDragging(
    e,
    pomodoroWidgetElement,
    {
      setDragging: (v) => (isDraggingPomodoro = v),
      setOffsetX: (v) => (pomodoroOffsetX = v),
      setOffsetY: (v) => (pomodoroOffsetY = v),
    },
    handlePomodoroPointerMove,
    handlePomodoroPointerUp
  );
}
function handlePomodoroPointerMove(e: PointerEvent) {
  dragMove(e, pomodoroWidgetElement, {
    isDragging: isDraggingPomodoro,
    offsetX: pomodoroOffsetX,
    offsetY: pomodoroOffsetY,
  });
}
function handlePomodoroPointerUp(e?: PointerEvent) {
  stopDragging(
    pomodoroWidgetElement,
    { setDragging: (v) => (isDraggingPomodoro = v) },
    handlePomodoroPointerMove,
    LSK.pomodoroPos,
    e
  );
}

// --- To-Do Resizing Logic ---
function handleTodoResizePointerDown(e: PointerEvent) {
  if (!todoWidgetElement) return;
  e.stopPropagation();
  e.preventDefault();
  isResizingTodo = true;
  try {
    todoWidgetElement.setPointerCapture(e.pointerId);
  } catch (err) {
    console.error("Resize capture failed:", err);
    return;
  }
  todoWidgetElement.classList.add("resizing");
  document.body.style.cursor = "nwse-resize";
  document.body.style.userSelect = "none";
  if (navbar) navbarHeight = navbar.offsetHeight;
  initialTodoWidth = todoWidgetElement.offsetWidth;
  initialTodoHeight = todoWidgetElement.offsetHeight;
  initialMouseX = e.clientX;
  initialMouseY = e.clientY;
  document.addEventListener("pointermove", handleTodoResizePointerMove);
  document.addEventListener("pointerup", handleTodoResizePointerUp, {
    once: true,
  });
}
function handleTodoResizePointerMove(e: PointerEvent) {
  if (!isResizingTodo || !todoWidgetElement) return;
  e.preventDefault();
  const deltaX = e.clientX - initialMouseX;
  const deltaY = e.clientY - initialMouseY;
  let newWidth = initialTodoWidth + deltaX;
  let newHeight = initialTodoHeight + deltaY;
  const rect = todoWidgetElement.getBoundingClientRect();
  newWidth = Math.max(
    MIN_WIDGET_WIDTH,
    Math.min(window.innerWidth - rect.left - WIDGET_POSITION_PADDING, newWidth)
  );
  newHeight = Math.max(
    MIN_WIDGET_HEIGHT,
    Math.min(window.innerHeight - rect.top - WIDGET_POSITION_PADDING, newHeight)
  );
  todoWidgetElement.style.width = `${newWidth}px`;
  todoWidgetElement.style.height = `${newHeight}px`;
}
function handleTodoResizePointerUp(e: PointerEvent) {
  if (!isResizingTodo) return;
  isResizingTodo = false;
  if (todoWidgetElement) {
    todoWidgetElement.classList.remove("resizing");
    if (e?.pointerId) {
      try {
        todoWidgetElement.releasePointerCapture(e.pointerId);
      } catch (err) { }
    }
  }
  document.body.style.cursor = "";
  document.body.style.userSelect = "";
  document.removeEventListener("pointermove", handleTodoResizePointerMove);
}

// --- Utility Function ---
function addRemoveClassesOfMultipleElements(c: ClassesToAddAndRemove) {
  const process = (
    map: ElementClassMap | undefined,
    action: "add" | "remove"
  ) => {
    if (map) {
      for (const [className, elements] of Object.entries(map)) {
        if (Array.isArray(elements)) {
          elements
            .filter((el): el is HTMLElement => el !== null)
            .forEach((el) => el.classList[action](className));
        }
      }
    }
  };
  process(c?.toAdd, "add");
  process(c?.toRemove, "remove");
}

// --- Dropdown Actions ---
async function handleCopyLink() {
  if (!copyLinkButton) {
    console.error("Copy link button not found.");
    return;
  }
  const button = copyLinkButton;
  try {
    await navigator.clipboard.writeText(SITE_URL);
    let tooltip = bootstrap.Tooltip.getInstance(button);
    if (!tooltip) {
      tooltip = new bootstrap.Tooltip(button, { trigger: "manual" });
    }
    const originalTitle =
      button.getAttribute("data-bs-original-title") || "Copy Link";
    button.setAttribute("data-bs-original-title", "Copied!");
    tooltip.show();
    setTimeout(() => {
      tooltip?.hide();
      button.setAttribute("data-bs-original-title", originalTitle);
    }, 1500);
  } catch (err) {
    console.error("Failed to copy link: ", err);
    alert("Failed to copy link to clipboard.");
  }
}
async function handleShare() {
  if (navigator.share) {
    try {
      await navigator.share({
        title: SITE_TITLE,
        text: `Keep your screen awake with ${SITE_TITLE}!`,
        url: SITE_URL,
      });
      console.log("Shared successfully");
    } catch (err: any) {
      if (err.name !== "AbortError") {
        console.error("Error sharing:", err);
        alert("Could not share the app. Link copied instead!");
        handleCopyLink();
      } else {
        console.log("Share cancelled by user.");
      }
    }
  } else {
    console.warn("Web Share API not supported. Copying link instead.");
    alert(
      "Web Share not supported on this browser/device. Link copied instead!"
    );
    handleCopyLink();
  }
}
async function handleInstallPWA() {
  if (!deferredInstallPrompt) {
    console.log("Install prompt is not available.");
    if (installPWAItem) {
      installPWAItem.style.display = "none";
    }
    return;
  }
  try {
    await deferredInstallPrompt.prompt();
    console.log("Install prompt shown.");
    const { outcome } = await deferredInstallPrompt.userChoice;
    console.log(`User response to the install prompt: ${outcome}`);
    if (installPWAItem) {
      installPWAItem.style.display = "none";
    }
    deferredInstallPrompt = null;
  } catch (err) {
    console.error("Error showing install prompt:", err);
    deferredInstallPrompt = null;
    if (installPWAItem) {
      installPWAItem.style.display = "none";
    }
  }
}

// --- Main Initialization ---
function initializeApp() {
  console.log("Initializing App...");

  // --- 1. Query DOM Elements ---
  navbar = document.getElementById("navbar");
  favicon = document.getElementById("web-icon") as HTMLLinkElement | null;
  keepAwakeSwitch = document.getElementById(
    "keep-awake-switch"
  ) as HTMLInputElement | null;
  digitalClockElement = document.getElementById("digital-clock");
  userGreetingElement = document.getElementById("user-greeting");
  clockFormatSwitch = document.getElementById(
    "clock-format-switch"
  ) as HTMLInputElement | null;
  showClockWidgetSwitch = document.getElementById(
    "show-clock-widget-switch"
  ) as HTMLInputElement | null;
  showPomodoroWidgetSwitch = document.getElementById(
    "show-pomodoro-widget-switch"
  ) as HTMLInputElement | null;
  showBatteryWidgetSwitch = document.getElementById(
    "show-battery-widget-switch"
  ) as HTMLInputElement | null;
  showTodoWidgetSwitch = document.getElementById(
    "show-todo-widget-switch"
  ) as HTMLInputElement | null;
  minimalModeSwitch = document.getElementById(
    "minimal-mode-switch"
  ) as HTMLInputElement | null;
  copyLinkButton = document.getElementById(
    "copy-link-btn"
  ) as HTMLButtonElement | null;
  shareButton = document.getElementById(
    "share-btn"
  ) as HTMLButtonElement | null;
  editNameButton = document.getElementById(
    "edit-name-btn"
  ) as HTMLButtonElement | null;
  installPWAItem = document.getElementById(
    "install-pwa-item"
  ) as HTMLLIElement | null;
  installPWAButton = document.getElementById(
    "install-pwa-btn"
  ) as HTMLButtonElement | null;
  heroSection = document.getElementById("hero-section");
  statusText = document.getElementById("screen-status");
  infoDisclaimerElement = document.getElementById("info-disclaimer");
  batteryWidgetElement = document.getElementById("battery-widget");
  todoWidgetElement = document.getElementById("todo-widget");
  pomodoroWidgetElement = document.getElementById("pomodoro-widget");
  addTodoButtonElement = document.getElementById(
    "add-todo-button"
  ) as HTMLButtonElement | null;
  startPomodoroButtonElement = document.getElementById(
    "start-pomodoro-btn"
  ) as HTMLButtonElement | null;
  helpModalElement = document.getElementById("helpModal");

  // --- 2. Initialize Bootstrap Tooltips ---
  const tooltipTriggerList = Array.from(
    document.querySelectorAll('[data-bs-toggle="tooltip"]')
  );
  tooltipTriggerList.forEach((tooltipTriggerEl) => {
    if (tooltipTriggerEl instanceof HTMLElement) {
      if (tooltipTriggerEl.id === "copy-link-btn") {
        new bootstrap.Tooltip(tooltipTriggerEl, { trigger: "manual" });
      } else {
        new bootstrap.Tooltip(tooltipTriggerEl);
      }
    }
  });

  // --- 3. Load User Preferences and State ---
  userName = localStorage.getItem(LSK.userName);
  is12HourFormat = localStorage.getItem(LSK.clockFormat) === "12h";
  clockWidgetVisible = localStorage.getItem(LSK.clockWidgetVisible) !== "false";
  pomodoroVisible = localStorage.getItem(LSK.pomodoroVisible) !== "false";
  batteryVisible = localStorage.getItem(LSK.batteryVisible) !== "false";
  todoVisible = localStorage.getItem(LSK.todoVisible) !== "false";
  minimalModeActive = localStorage.getItem(LSK.minimalModeActive) === "true";

  // --- 4. Set Initial States of UI Controls ---
  if (clockFormatSwitch) clockFormatSwitch.checked = is12HourFormat;
  if (showClockWidgetSwitch) showClockWidgetSwitch.checked = clockWidgetVisible;
  if (showPomodoroWidgetSwitch)
    showPomodoroWidgetSwitch.checked = pomodoroVisible;
  if (showBatteryWidgetSwitch) showBatteryWidgetSwitch.checked = batteryVisible;
  if (showTodoWidgetSwitch) showTodoWidgetSwitch.checked = todoVisible;
  if (minimalModeSwitch) minimalModeSwitch.checked = minimalModeActive;

  // --- 5. Initialize Core Features & Widgets ---
  updateClock();
  if (clockInterval) clearInterval(clockInterval);
  clockInterval = window.setInterval(updateClock, 1000);
  initializeDigitalClockWidget();
  initializeBatteryIndicator();
  initializeTodoList();
  initializePomodoroTimer();
  loadAllWidgetPositions();
  applyAllWidgetVisibilities();

  // --- 6. Handle User Greeting & Name Prompt Initialization ---
  initializeAndMaybeShowNamePrompt(!userName);
  if (userName) {
    updateGreeting();
  }

  // --- 7. Add Core Event Listeners ---
  keepAwakeSwitch?.addEventListener("change", changeSwitch);
  clockFormatSwitch?.addEventListener("change", handleClockFormatToggle);
  showClockWidgetSwitch?.addEventListener("change", handleShowClockToggle);
  showPomodoroWidgetSwitch?.addEventListener(
    "change",
    handleShowPomodoroToggle
  );
  showBatteryWidgetSwitch?.addEventListener("change", handleShowBatteryToggle);
  showTodoWidgetSwitch?.addEventListener("change", handleShowTodoToggle);
  minimalModeSwitch?.addEventListener("change", handleMinimalModeToggle);
  copyLinkButton?.addEventListener("click", handleCopyLink);
  shareButton?.addEventListener("click", handleShare);
  editNameButton?.addEventListener("click", handleEditNameClick);
  installPWAButton?.addEventListener("click", handleInstallPWA);

  // --- 8. Set Initial NoSleep State and UI ---
  if (keepAwakeSwitch) {
    const isChecked = keepAwakeSwitch.checked;
    changeStatusText(isChecked);
    changeBackground(isChecked);
    changeFavicon(isChecked);
    if (isChecked) {
      nosleep.enable().catch(handleNoSleepError);
    }
  } else {
    console.error("Keep awake switch not found! Cannot initialize NoSleep.");
    changeBackground(false);
    changeStatusText(false);
    changeFavicon(false);
  }

  // --- 9. PWA Service Worker Registration ---
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("./service-worker.js")
        .then((registration) =>
          console.log(
            "Service Worker registered with scope:",
            registration.scope
          )
        )
        .catch((error) =>
          console.error("Service Worker registration failed:", error)
        );
    });
  } else {
    console.log("Service workers are not supported in this browser.");
  }

  // <<< START: ADDED FOR BMC WIDGET INITIALIZATION >>>
  // --- 10. BMC Widget Color Initialization ---
  // The BMC widget loads asynchronously. We poll for its element to appear
  // and set the correct initial color based on the app's state, in case
  // it loaded after the initial `changeBackground` call.
  let bmcInitTries = 0;
  const bmcInitInterval = setInterval(() => {
    const bmcButton = document.getElementById("bmc-wbtn");
    // Stop polling if the button is found or after 10 seconds (100 tries * 100ms)
    if (bmcButton || bmcInitTries > 100) {
      clearInterval(bmcInitInterval);
      if (bmcButton && keepAwakeSwitch) {
        updateBmcWidgetColor(keepAwakeSwitch.checked);
      }
    }
    bmcInitTries++;
  }, 100);
  // <<< END: ADDED FOR BMC WIDGET INITIALIZATION >>>

  console.log("App Initialization Complete.");
}

// --- Run Initialization ---
window.addEventListener("DOMContentLoaded", initializeApp);

// --- Global Event Listeners ---
window.addEventListener("beforeunload", () => {
  if (isPomodoroRunning) savePomodoroState();
});
window.addEventListener("beforeinstallprompt", (e: Event) => {
  e.preventDefault();
  deferredInstallPrompt = e as BeforeInstallPromptEvent;
  console.log("`beforeinstallprompt` event fired. PWA install available.");
  if (installPWAItem) {
    installPWAItem.style.display = "block";
  }
});
window.addEventListener("appinstalled", () => {
  console.log("PWA was installed successfully!");
  if (installPWAItem) {
    installPWAItem.style.display = "none";
  }
  deferredInstallPrompt = null;
});
