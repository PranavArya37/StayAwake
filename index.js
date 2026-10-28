var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import NoSleep from "./nosleep/nosleep.js";
// --- END: Type Definitions ---
// --- DOM Element Variables ---
// (No changes needed here)
let heroSection = null, navbar = null, statusText = null, favicon = null, keepAwakeSwitch = null, digitalClockElement = null, userGreetingElement = null, clockFormatSwitch = null, 
// Widget Toggles
showClockWidgetSwitch = null, showPomodoroWidgetSwitch = null, showBatteryWidgetSwitch = null, showTodoWidgetSwitch = null, minimalModeSwitch = null, 
// Dropdown Buttons
copyLinkButton = null, shareButton = null, editNameButton = null, installPWAItem = null, installPWAButton = null, 
// Modals
namePromptModalElement = null, userNameInputElement = null, submitNameButtonElement = null, nameInputErrorElement = null, namePromptModalInstance = null, helpModalElement = null, 
// Widget Elements
digitalClockWidgetElement = null, widgetDigitalDateDisplayElement = null, widgetDigitalTimeDisplayElement = null, batteryWidgetElement = null, batteryLevelElement = null, batteryPercentageValueElement = null, batteryChargingStatusElement = null, batteryLowStatusElement = null, todoWidgetElement = null, todoListElement = null, newTodoInputElement = null, addTodoButtonElement = null, todoResizeHandleElement = null, pomodoroWidgetElement = null, pomodoroModeButtons = null, pomodoroTimeDisplayElement = null, startPomodoroButtonElement = null, pausePomodoroButtonElement = null, resetPomodoroButtonElement = null, 
// Pomodoro Finished Alert Modal Elements
pomodoroFinishedSoundElement = null, pomodoroFinishedAlertModalElement = null, pomodoroFinishedAlertModalInstance = null, pomodoroFinishedAlertModalLabelElement = null, pomodoroFinishedAlertMessageElement = null, 
// Other Elements
infoDisclaimerElement = null;
// --- State Variables ---
// (No changes needed here)
let nosleep = new NoSleep(), userName = null, clockInterval = null, is12HourFormat = false, clockWidgetVisible = true, pomodoroVisible = true, batteryVisible = true, todoVisible = true, minimalModeActive = false, deferredInstallPrompt = null, isDraggingClock = false, clockOffsetX = 0, clockOffsetY = 0, isDraggingBattery = false, batteryOffsetX = 0, batteryOffsetY = 0, isDraggingTodo = false, todoOffsetX = 0, todoOffsetY = 0, isDraggingPomodoro = false, pomodoroOffsetX = 0, pomodoroOffsetY = 0, isResizingTodo = false, initialTodoWidth = 0, initialTodoHeight = 0, initialMouseX = 0, initialMouseY = 0, navbarHeight = 0;
let todos = [];
let pomodoroMode = "pomodoro", pomodoroTotalDuration = 25 * 60, pomodoroRemainingTime = pomodoroTotalDuration, pomodoroInterval = null, isPomodoroRunning = false;
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
const POMODORO_FINISHED_SOUND_URL = "https://pomofocus.io/audios/alarms/alarm-wood.mp3";
// <<< START: ADDED FOR BMC WIDGET >>>
const BMC_AWAKE_COLOR = "#40DCA5";
const BMC_SLEEPY_COLOR = "#008dd5";
// <<< END: ADDED FOR BMC WIDGET >>>
// --- Utility: Safe Element Access ---
function ensureElements(elements) {
    for (const key in elements) {
        const el = elements[key];
        if (!el || (el instanceof NodeList && el.length === 0)) {
            console.error(`Initialization failed: Element(s) for '${key}' not found.`);
            return false;
        }
    }
    return true;
}
// --- Error Handling ---
function handleNoSleepError(err) {
    let message = "NoSleep Error";
    if (err instanceof Error) {
        message += `: ${err.name}, ${err.message}`;
    }
    else {
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
function updateBmcWidgetColor(isAwake) {
    // The BMC widget script creates a div with the ID 'bmc-wbtn'.
    const bmcButton = document.getElementById("bmc-wbtn");
    if (bmcButton) {
        // The color is controlled by the 'background-color' style property.
        bmcButton.style.backgroundColor = isAwake
            ? BMC_AWAKE_COLOR
            : BMC_SLEEPY_COLOR;
    }
}
// <<< END: NEW FUNCTION FOR BMC WIDGET >>>
function changeSwitch(event) {
    const target = event.target;
    if ((target === null || target === void 0 ? void 0 : target.checked) !== undefined) {
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
function changeBackground(isAwake) {
    const baseHighlightTargets = [];
    if (navbar)
        baseHighlightTargets.push(navbar.querySelector(".navbar-brand span"));
    if (userGreetingElement)
        baseHighlightTargets.push(userGreetingElement.querySelector(".user-name"));
    const disclaimerHighlightSpan = infoDisclaimerElement === null || infoDisclaimerElement === void 0 ? void 0 : infoDisclaimerElement.querySelector("span");
    if (disclaimerHighlightSpan instanceof HTMLElement)
        baseHighlightTargets.push(disclaimerHighlightSpan);
    const uniqueTextHighlights = Array.from(new Set(baseHighlightTargets.filter((el) => el !== null)));
    const icons = [];
    [
        digitalClockWidgetElement,
        batteryWidgetElement,
        todoWidgetElement,
        pomodoroWidgetElement,
    ].forEach((widget) => {
        if (widget)
            icons.push(widget.querySelector(".widget-header .widget-icon"));
    });
    const generalButtons = [
        addTodoButtonElement,
        startPomodoroButtonElement,
    ];
    const statusElement = [statusText];
    const classToAdd = isAwake ? "background-enabled" : "background-disabled";
    const classToRemove = isAwake ? "background-disabled" : "background-enabled";
    document.documentElement.classList.add(classToAdd);
    document.documentElement.classList.remove(classToRemove);
    const highlightClassMap = isAwake
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
function changeStatusText(isAwake) {
    if (statusText) {
        statusText.innerText = isAwake ? "Awake" : "Almost sleepy";
        statusText.classList.toggle("highlight-text", isAwake);
        statusText.classList.toggle("secondary-highlight-text", !isAwake);
    }
}
function changeFavicon(isAwake) {
    if (favicon) {
        favicon.href = isAwake
            ? "./favicon/favicon_green.ico"
            : "./favicon/favicon_blue.ico";
    }
}
function getGreetingPrefix() {
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
        if (keepAwakeSwitch)
            changeBackground(keepAwakeSwitch.checked);
    }
    else if (userGreetingElement) {
        userGreetingElement.innerHTML = getGreetingPrefix() + "!";
    }
}
// ... (The rest of the file remains the same until initializeApp)
function formatTimePart(d, h12) {
    return d.toLocaleTimeString(h12 ? "en-US" : "en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: h12,
    });
}
function formatDatePart(d) {
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
function handleClockFormatToggle(e) {
    const t = e.target;
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
    digitalClockWidgetElement === null || digitalClockWidgetElement === void 0 ? void 0 : digitalClockWidgetElement.classList.toggle("widget-hidden", !shouldShowClock);
    pomodoroWidgetElement === null || pomodoroWidgetElement === void 0 ? void 0 : pomodoroWidgetElement.classList.toggle("widget-hidden", !shouldShowPomodoro);
    batteryWidgetElement === null || batteryWidgetElement === void 0 ? void 0 : batteryWidgetElement.classList.toggle("widget-hidden", !shouldShowBattery);
    todoWidgetElement === null || todoWidgetElement === void 0 ? void 0 : todoWidgetElement.classList.toggle("widget-hidden", !shouldShowTodo);
    const disableIndividualToggles = minimalModeActive;
    [
        showClockWidgetSwitch,
        showPomodoroWidgetSwitch,
        showBatteryWidgetSwitch,
        showTodoWidgetSwitch,
    ].forEach((widgetSwitch) => {
        var _a;
        if (widgetSwitch) {
            widgetSwitch.disabled = disableIndividualToggles;
            (_a = widgetSwitch
                .closest(".form-check")) === null || _a === void 0 ? void 0 : _a.classList.toggle("opacity-50", disableIndividualToggles);
        }
    });
    if (shouldShowPomodoro) {
        updatePomodoroDisplay();
    }
    else {
        if (document.title.includes("Focus") || document.title.includes("Break")) {
            document.title = SITE_TITLE;
        }
    }
}
function handleShowClockToggle(event) {
    const target = event.target;
    if (target) {
        clockWidgetVisible = target.checked;
        localStorage.setItem(LSK.clockWidgetVisible, clockWidgetVisible ? "true" : "false");
        applyAllWidgetVisibilities();
    }
}
function handleShowPomodoroToggle(event) {
    const target = event.target;
    if (target) {
        pomodoroVisible = target.checked;
        localStorage.setItem(LSK.pomodoroVisible, pomodoroVisible ? "true" : "false");
        applyAllWidgetVisibilities();
    }
}
function handleShowBatteryToggle(event) {
    const target = event.target;
    if (target) {
        batteryVisible = target.checked;
        localStorage.setItem(LSK.batteryVisible, batteryVisible ? "true" : "false");
        applyAllWidgetVisibilities();
    }
}
function handleShowTodoToggle(event) {
    const target = event.target;
    if (target) {
        todoVisible = target.checked;
        localStorage.setItem(LSK.todoVisible, todoVisible ? "true" : "false");
        applyAllWidgetVisibilities();
    }
}
function handleMinimalModeToggle(event) {
    const target = event.target;
    if (target) {
        minimalModeActive = target.checked;
        localStorage.setItem(LSK.minimalModeActive, minimalModeActive ? "true" : "false");
        applyAllWidgetVisibilities();
    }
}
// --- Name Prompt & Edit ---
// (No changes needed here)
function handleNameSubmit() {
    const n = userNameInputElement === null || userNameInputElement === void 0 ? void 0 : userNameInputElement.value.trim();
    if (n && userNameInputElement && nameInputErrorElement) {
        userName = n;
        localStorage.setItem(LSK.userName, n);
        updateGreeting();
        nameInputErrorElement.classList.add("d-none");
        userNameInputElement.classList.remove("is-invalid");
        namePromptModalInstance === null || namePromptModalInstance === void 0 ? void 0 : namePromptModalInstance.hide();
    }
    else if (userNameInputElement && nameInputErrorElement) {
        nameInputErrorElement.classList.remove("d-none");
        userNameInputElement.classList.add("is-invalid");
        userNameInputElement.focus();
    }
}
function initializeAndMaybeShowNamePrompt(show = false) {
    namePromptModalElement = document.getElementById("namePromptModal");
    userNameInputElement = document.getElementById("userNameInput");
    submitNameButtonElement = document.getElementById("submitNameButton");
    nameInputErrorElement = document.getElementById("nameInputError");
    if (ensureElements({
        namePromptModalElement,
        userNameInputElement,
        submitNameButtonElement,
        nameInputErrorElement,
    })) {
        if (!namePromptModalInstance) {
            namePromptModalInstance = bootstrap.Modal.getOrCreateInstance(namePromptModalElement);
            submitNameButtonElement.addEventListener("click", handleNameSubmit);
            userNameInputElement.addEventListener("keypress", handleEnterKey);
            namePromptModalElement.addEventListener("shown.bs.modal", () => userNameInputElement === null || userNameInputElement === void 0 ? void 0 : userNameInputElement.focus());
        }
        if (show) {
            userNameInputElement.value = "";
            nameInputErrorElement === null || nameInputErrorElement === void 0 ? void 0 : nameInputErrorElement.classList.add("d-none");
            userNameInputElement.classList.remove("is-invalid");
            namePromptModalInstance === null || namePromptModalInstance === void 0 ? void 0 : namePromptModalInstance.show();
        }
    }
    else {
        console.error("Cannot initialize name prompt: Modal elements missing.");
        if (!userName) {
            updateGreeting();
        }
    }
}
function handleEnterKey(e) {
    if (e.key === "Enter" && userNameInputElement === document.activeElement) {
        e.preventDefault();
        handleNameSubmit();
    }
}
function handleEditNameClick() {
    if (namePromptModalInstance && userNameInputElement) {
        userNameInputElement.value = userName || "";
        nameInputErrorElement === null || nameInputErrorElement === void 0 ? void 0 : nameInputErrorElement.classList.add("d-none");
        userNameInputElement.classList.remove("is-invalid");
        namePromptModalInstance.show();
    }
    else {
        console.error("Cannot open edit name modal: Instance or input element not found.");
        initializeAndMaybeShowNamePrompt(true);
    }
}
// ... (The rest of the file remains the same until initializeApp)
// --- Battery Functions ---
function updateBatteryUI(battery) {
    if (!batteryLevelElement ||
        !batteryPercentageValueElement ||
        !batteryChargingStatusElement ||
        !batteryLowStatusElement)
        return;
    const level = battery.level;
    const percentage = Math.round(level * 100);
    const isCharging = battery.charging;
    const isLow = !isCharging && level <= 0.2;
    batteryPercentageValueElement.innerText = percentage.toString();
    batteryLevelElement.style.height = `${percentage}%`;
    batteryLevelElement.classList.remove("level-low", "level-medium", "level-high");
    if (level <= 0.2)
        batteryLevelElement.classList.add("level-low");
    else if (level <= 0.5)
        batteryLevelElement.classList.add("level-medium");
    else
        batteryLevelElement.classList.add("level-high");
    batteryChargingStatusElement.style.display = isCharging ? "block" : "none";
    batteryLowStatusElement.style.display = isLow ? "block" : "none";
}
function initializeBatteryIndicator() {
    var _a;
    if ("getBattery" in navigator && typeof navigator.getBattery === "function") {
        navigator
            .getBattery()
            .then((batteryManager) => {
            batteryWidgetElement = document.getElementById("battery-widget");
            batteryLevelElement = document.getElementById("battery-level");
            batteryPercentageValueElement = document.getElementById("battery-percentage-value");
            batteryChargingStatusElement = document.getElementById("battery-charging-status");
            batteryLowStatusElement = document.getElementById("battery-low-status");
            if (ensureElements({
                batteryWidgetElement,
                batteryLevelElement,
                batteryPercentageValueElement,
                batteryChargingStatusElement,
                batteryLowStatusElement,
            })) {
                updateBatteryUI(batteryManager);
                batteryManager.addEventListener("levelchange", () => updateBatteryUI(batteryManager));
                batteryManager.addEventListener("chargingchange", () => updateBatteryUI(batteryManager));
                const header = batteryWidgetElement.querySelector(".widget-header");
                if (header)
                    header.addEventListener("pointerdown", handleBatteryPointerDown);
                else
                    console.error("Battery widget header not found!");
            }
            else {
                console.error("Battery widget init failed: elements missing.");
                if (batteryWidgetElement)
                    batteryWidgetElement.classList.add("widget-hidden");
            }
        })
            .catch((error) => {
            var _a;
            let message = "Battery API error";
            if (error instanceof Error)
                message += `: ${error.message}`;
            console.error(message, error);
            const widget = document.getElementById("battery-widget");
            if (widget)
                widget.classList.add("widget-hidden");
            if (showBatteryWidgetSwitch) {
                showBatteryWidgetSwitch.checked = false;
                showBatteryWidgetSwitch.disabled = true;
                (_a = showBatteryWidgetSwitch
                    .closest(".form-check")) === null || _a === void 0 ? void 0 : _a.classList.add("opacity-50");
                batteryVisible = false;
                localStorage.setItem(LSK.batteryVisible, "false");
                applyAllWidgetVisibilities();
            }
        });
    }
    else {
        console.warn("Battery API not supported.");
        const widget = document.getElementById("battery-widget");
        if (widget)
            widget.classList.add("widget-hidden");
        if (showBatteryWidgetSwitch) {
            showBatteryWidgetSwitch.checked = false;
            showBatteryWidgetSwitch.disabled = true;
            (_a = showBatteryWidgetSwitch
                .closest(".form-check")) === null || _a === void 0 ? void 0 : _a.classList.add("opacity-50");
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
            if (Array.isArray(p) &&
                p.every((i) => typeof i === "object" &&
                    i !== null &&
                    typeof i.id === "number" &&
                    typeof i.text === "string" &&
                    typeof i.completed === "boolean")) {
                todos = p;
            }
            else {
                console.warn("Invalid To-Do data. Resetting.");
                todos = [];
                localStorage.removeItem(LSK.todos);
            }
        }
        else {
            todos = [];
        }
    }
    catch (e) {
        console.error("Error parsing todos:", e);
        todos = [];
        localStorage.removeItem(LSK.todos);
    }
}
function saveTodos() {
    try {
        localStorage.setItem(LSK.todos, JSON.stringify(todos));
    }
    catch (e) {
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
        todoListElement.appendChild(li);
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
        cb.setAttribute("aria-label", `Mark task "${todo.text}" as ${todo.completed ? "incomplete" : "complete"}`);
        const span = document.createElement("span");
        span.textContent = todo.text;
        const btn = document.createElement("button");
        btn.className = "delete-todo-btn";
        btn.innerHTML = '<i class="fas fa-trash-alt" aria-hidden="true"></i>';
        btn.title = `Delete task "${todo.text}"`;
        btn.setAttribute("aria-label", `Delete task "${todo.text}"`);
        btn.addEventListener("click", () => deleteTodo(todo.id));
        li.append(cb, span, btn);
        todoListElement.appendChild(li);
    });
}
function addTodo() {
    const t = newTodoInputElement === null || newTodoInputElement === void 0 ? void 0 : newTodoInputElement.value.trim();
    if (t && newTodoInputElement) {
        todos.push({ id: Date.now(), text: t, completed: false });
        saveTodos();
        renderTodos();
        newTodoInputElement.value = "";
        newTodoInputElement.focus();
    }
    else if (newTodoInputElement) {
        newTodoInputElement.focus();
    }
}
function toggleTodo(id) {
    todos = todos.map((t) => t.id === id ? Object.assign(Object.assign({}, t), { completed: !t.completed }) : t);
    saveTodos();
    renderTodos();
}
function deleteTodo(id) {
    todos = todos.filter((t) => t.id !== id);
    saveTodos();
    renderTodos();
}
function initializeTodoList() {
    todoWidgetElement = document.getElementById("todo-widget");
    todoListElement = document.getElementById("todo-list");
    newTodoInputElement = document.getElementById("new-todo-input");
    addTodoButtonElement = document.getElementById("add-todo-button");
    if (todoWidgetElement) {
        todoResizeHandleElement = todoWidgetElement.querySelector(".widget-resize-handle");
        if (ensureElements({
            todoWidgetElement,
            todoListElement,
            newTodoInputElement,
            addTodoButtonElement,
            todoResizeHandleElement,
        })) {
            loadTodos();
            renderTodos();
            addTodoButtonElement.addEventListener("click", addTodo);
            newTodoInputElement.addEventListener("keypress", (event) => {
                if (event.key === "Enter") {
                    event.preventDefault();
                    addTodo();
                }
            });
            const header = todoWidgetElement.querySelector(".widget-header");
            if (header)
                header.addEventListener("pointerdown", handleTodoPointerDown);
            else
                console.error("To-Do widget header not found!");
            todoResizeHandleElement.addEventListener("pointerdown", handleTodoResizePointerDown);
        }
        else {
            console.error("To-Do init failed: elements missing.");
            if (todoWidgetElement)
                todoWidgetElement.classList.add("widget-hidden");
        }
    }
    else {
        console.error("To-Do widget not found.");
    }
}
// --- Pomodoro Timer Functions ---
function formatPomodoroTime(s) {
    const m = Math.floor(s / 60);
    const c = s % 60;
    return `${String(m).padStart(2, "0")}:${String(c).padStart(2, "0")}`;
}
function updatePomodoroDisplay() {
    if (pomodoroTimeDisplayElement) {
        pomodoroTimeDisplayElement.innerText = formatPomodoroTime(pomodoroRemainingTime);
        const isPomodoroWidgetVisible = !(pomodoroWidgetElement === null || pomodoroWidgetElement === void 0 ? void 0 : pomodoroWidgetElement.classList.contains("widget-hidden"));
        if (isPomodoroRunning && isPomodoroWidgetVisible) {
            const modeText = pomodoroMode === "pomodoro" ? "Focus" : "Break";
            document.title = `${formatPomodoroTime(pomodoroRemainingTime)} - ${modeText} | ${SITE_TITLE}`;
        }
        else {
            if (document.title !== SITE_TITLE) {
                document.title = SITE_TITLE;
            }
        }
    }
}
function updatePomodoroControls() {
    if (!startPomodoroButtonElement ||
        !pausePomodoroButtonElement ||
        !resetPomodoroButtonElement)
        return;
    const ss = !isPomodoroRunning;
    const sp = isPomodoroRunning;
    const sr = sp || (!isPomodoroRunning && pomodoroRemainingTime < pomodoroTotalDuration);
    startPomodoroButtonElement.style.display = ss ? "inline-block" : "none";
    pausePomodoroButtonElement.style.display = sp ? "inline-block" : "none";
    resetPomodoroButtonElement.style.display = sr ? "inline-block" : "none";
}
function savePomodoroState() {
    const s = {
        mode: pomodoroMode,
        remainingTime: pomodoroRemainingTime,
        isRunning: isPomodoroRunning,
        lastTickTimestamp: isPomodoroRunning ? Date.now() : undefined,
    };
    try {
        localStorage.setItem(LSK.pomodoroState, JSON.stringify(s));
    }
    catch (e) {
        console.error("Error saving Pomodoro state:", e);
    }
}
function loadPomodoroState() {
    const j = localStorage.getItem(LSK.pomodoroState);
    let l = false;
    if (j) {
        try {
            const s = JSON.parse(j);
            if (s &&
                typeof s === "object" &&
                ["pomodoro", "shortBreak", "longBreak"].includes(s.mode) &&
                typeof s.remainingTime === "number" &&
                typeof s.isRunning === "boolean" &&
                (s.lastTickTimestamp === undefined ||
                    typeof s.lastTickTimestamp === "number")) {
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
                }
                else if (!isPomodoroRunning && pomodoroRemainingTime <= 0) {
                    pomodoroTotalDuration = getDurationForMode(pomodoroMode);
                    pomodoroRemainingTime = pomodoroTotalDuration;
                }
                pomodoroTotalDuration = getDurationForMode(pomodoroMode);
                pomodoroRemainingTime = Math.min(pomodoroRemainingTime, pomodoroTotalDuration);
                l = true;
            }
            else {
                console.warn("Invalid Pomodoro state. Resetting.");
                localStorage.removeItem(LSK.pomodoroState);
            }
        }
        catch (e) {
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
function getDurationForMode(m) {
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
    var _a;
    if (!pomodoroModeButtons)
        return;
    const isAwakeActive = (_a = keepAwakeSwitch === null || keepAwakeSwitch === void 0 ? void 0 : keepAwakeSwitch.checked) !== null && _a !== void 0 ? _a : true;
    pomodoroModeButtons.forEach((b) => {
        const isCurrentMode = b.dataset.mode === pomodoroMode;
        b.classList.toggle("active", isCurrentMode);
        b.classList.toggle("secondary-active", isCurrentMode && !isAwakeActive);
    });
}
function switchPomodoroMode(nm) {
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
    if (isPomodoroRunning || pomodoroRemainingTime <= 0)
        return;
    isPomodoroRunning = true;
    updatePomodoroControls();
    if (sv)
        savePomodoroState();
    if (pomodoroInterval)
        clearInterval(pomodoroInterval);
    const tick = () => {
        if (!isPomodoroRunning) {
            clearInterval(pomodoroInterval);
            pomodoroInterval = null;
            return;
        }
        pomodoroRemainingTime--;
        updatePomodoroDisplay();
        if (pomodoroRemainingTime <= 0) {
            pomodoroFinishedSoundElement === null || pomodoroFinishedSoundElement === void 0 ? void 0 : pomodoroFinishedSoundElement.play().catch((err) => console.error("Error playing sound:", err));
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
            pomodoroFinishedAlertModalInstance === null || pomodoroFinishedAlertModalInstance === void 0 ? void 0 : pomodoroFinishedAlertModalInstance.show();
            pausePomodoroTimer(false);
            console.log(`Pomodoro Timer (${pomodoroMode}) finished!`);
            pomodoroRemainingTime = pomodoroTotalDuration;
            updatePomodoroDisplay();
            updatePomodoroControls();
            savePomodoroState();
        }
        else if (pomodoroRemainingTime % 15 === 0) {
            savePomodoroState();
        }
    };
    tick();
    pomodoroInterval = window.setInterval(tick, 1000);
}
function pausePomodoroTimer(sv = true) {
    if (!isPomodoroRunning)
        return;
    if (pomodoroInterval) {
        clearInterval(pomodoroInterval);
        pomodoroInterval = null;
    }
    isPomodoroRunning = false;
    updatePomodoroControls();
    if (sv)
        savePomodoroState();
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
    if (sv)
        savePomodoroState();
}
function initializePomodoroTimer() {
    pomodoroWidgetElement = document.getElementById("pomodoro-widget");
    pomodoroModeButtons = document.querySelectorAll(".pomodoro-mode-btn");
    pomodoroTimeDisplayElement = document.getElementById("pomodoro-time-display");
    startPomodoroButtonElement = document.getElementById("start-pomodoro-btn");
    pausePomodoroButtonElement = document.getElementById("pause-pomodoro-btn");
    resetPomodoroButtonElement = document.getElementById("reset-pomodoro-btn");
    pomodoroFinishedSoundElement = document.getElementById("pomodoro-finished-sound");
    pomodoroFinishedAlertModalElement = document.getElementById("pomodoroFinishedAlertModal");
    pomodoroFinishedAlertModalLabelElement = document.getElementById("pomodoroFinishedAlertModalLabel");
    pomodoroFinishedAlertMessageElement = document.getElementById("pomodoroFinishedAlertMessage");
    if (ensureElements({
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
    })) {
        loadPomodoroState();
        pomodoroModeButtons.forEach((button) => {
            button.addEventListener("click", () => {
                const mode = button.dataset.mode;
                if (mode)
                    switchPomodoroMode(mode);
            });
        });
        startPomodoroButtonElement.addEventListener("click", () => startPomodoroTimer());
        pausePomodoroButtonElement.addEventListener("click", () => pausePomodoroTimer());
        resetPomodoroButtonElement.addEventListener("click", () => resetPomodoroTimer());
        const header = pomodoroWidgetElement.querySelector(".widget-header");
        if (header)
            header.addEventListener("pointerdown", handlePomodoroPointerDown);
        else
            console.error("Pomodoro widget header not found!");
        if (pomodoroFinishedAlertModalElement) {
            pomodoroFinishedAlertModalInstance = new bootstrap.Modal(pomodoroFinishedAlertModalElement);
        }
        if (pomodoroFinishedSoundElement) {
            pomodoroFinishedSoundElement.src = POMODORO_FINISHED_SOUND_URL;
        }
    }
    else {
        console.error("Pomodoro init failed: elements missing.");
        if (pomodoroWidgetElement)
            pomodoroWidgetElement.classList.add("widget-hidden");
    }
}
// --- Clock Widget Initialization ---
function initializeDigitalClockWidget() {
    digitalClockWidgetElement = document.getElementById("digital-clock-widget");
    widgetDigitalDateDisplayElement = document.getElementById("widget-digital-date-display");
    widgetDigitalTimeDisplayElement = document.getElementById("widget-digital-time-display");
    if (ensureElements({
        digitalClockWidgetElement,
        widgetDigitalDateDisplayElement,
        widgetDigitalTimeDisplayElement,
    })) {
        const header = digitalClockWidgetElement.querySelector(".widget-header");
        if (header) {
            header.addEventListener("pointerdown", handleClockPointerDown);
        }
        else {
            console.error("Digital Clock widget header not found!");
        }
    }
    else {
        console.error("Digital Clock widget initialization failed: elements missing.");
        if (digitalClockWidgetElement)
            digitalClockWidgetElement.classList.add("widget-hidden");
    }
}
// --- Widget Position Persistence ---
function saveWidgetPosition(k, e) {
    if (!e || !k)
        return;
    const s = window.getComputedStyle(e);
    const p = { top: s.top, left: s.left };
    if (p.top === "auto" || p.left === "auto") {
        return;
    }
    try {
        localStorage.setItem(k, JSON.stringify(p));
    }
    catch (e) {
        console.error(`Error saving ${k}:`, e);
    }
}
function loadWidgetPosition(k, e, dT, dL, dR) {
    var _a, _b;
    if (!e || !k)
        return;
    let p = null;
    const j = localStorage.getItem(k);
    if (j) {
        try {
            p = JSON.parse(j);
            if (!p ||
                typeof p.top !== "string" ||
                typeof p.left !== "string" ||
                p.top === "auto" ||
                p.left === "auto") {
                p = null;
                localStorage.removeItem(k);
            }
        }
        catch (e) {
            console.error(`Error parsing ${k}:`, e);
            localStorage.removeItem(k);
            p = null;
        }
    }
    e.style.top = (_a = p === null || p === void 0 ? void 0 : p.top) !== null && _a !== void 0 ? _a : dT;
    e.style.left = (_b = p === null || p === void 0 ? void 0 : p.left) !== null && _b !== void 0 ? _b : dL;
    if (e.style.left === "auto" && dR) {
        e.style.right = dR;
    }
    else {
        e.style.right = "auto";
    }
    requestAnimationFrame(() => {
        try {
            if (navbar)
                navbarHeight = navbar.offsetHeight;
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
        }
        catch (err) {
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
    loadWidgetPosition(LSK.clockWidgetPos, digitalClockWidgetElement, defaultClockTop, defaultClockLeft);
    loadWidgetPosition(LSK.batteryPos, batteryWidgetElement, defaultBatteryTop, "auto", defaultBatteryRight);
    loadWidgetPosition(LSK.todoPos, todoWidgetElement, defaultTodoTop, defaultTodoLeft);
    loadWidgetPosition(LSK.pomodoroPos, pomodoroWidgetElement, defaultPomodoroTop, defaultPomodoroLeft);
}
// --- Dragging Logic ---
function startDragging(event, element, stateSetters, moveHandler, upHandler) {
    if (!element || !(event.target instanceof Node)) {
        return;
    }
    const targetElement = event.target;
    const header = element.querySelector(".widget-header");
    const dragHandle = element.querySelector(".widget-drag-handle");
    let canDrag = false;
    if (header && header.contains(targetElement)) {
        if (dragHandle) {
            canDrag = dragHandle.contains(targetElement) || targetElement === header;
        }
        else {
            canDrag = true;
        }
    }
    if (!canDrag ||
        targetElement.closest("button, input, a, select, textarea, .widget-resize-handle")) {
        return;
    }
    event.preventDefault();
    try {
        element.setPointerCapture(event.pointerId);
    }
    catch (err) {
        console.error("Failed to capture pointer:", err);
        return;
    }
    stateSetters.setDragging(true);
    element.classList.add("dragging");
    document.body.style.cursor = "grabbing";
    document.body.style.userSelect = "none";
    if (navbar)
        navbarHeight = navbar.offsetHeight;
    const rect = element.getBoundingClientRect();
    stateSetters.setOffsetX(event.clientX - rect.left);
    stateSetters.setOffsetY(event.clientY - rect.top);
    document.addEventListener("pointermove", moveHandler);
    document.addEventListener("pointerup", upHandler, { once: true });
}
function dragMove(e, el, s) {
    if (!s.isDragging || !el)
        return;
    e.preventDefault();
    const w = el.offsetWidth, h = el.offsetHeight;
    let newTop = e.clientY - s.offsetY, newLeft = e.clientX - s.offsetX;
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
function stopDragging(element, stateSetters, moveHandler, storageKey, event) {
    if (stateSetters) {
        stateSetters.setDragging(false);
    }
    if (element) {
        element.classList.remove("dragging");
        if (event === null || event === void 0 ? void 0 : event.pointerId) {
            try {
                element.releasePointerCapture(event.pointerId);
            }
            catch (err) { }
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
function handleClockPointerDown(event) {
    startDragging(event, digitalClockWidgetElement, {
        setDragging: (v) => (isDraggingClock = v),
        setOffsetX: (v) => (clockOffsetX = v),
        setOffsetY: (v) => (clockOffsetY = v),
    }, handleClockPointerMove, handleClockPointerUp);
}
function handleClockPointerMove(event) {
    dragMove(event, digitalClockWidgetElement, {
        isDragging: isDraggingClock,
        offsetX: clockOffsetX,
        offsetY: clockOffsetY,
    });
}
function handleClockPointerUp(event) {
    stopDragging(digitalClockWidgetElement, { setDragging: (v) => (isDraggingClock = v) }, handleClockPointerMove, LSK.clockWidgetPos, event);
}
function handleBatteryPointerDown(e) {
    if (batteryWidgetElement &&
        window.getComputedStyle(batteryWidgetElement).left === "auto") {
        const rect = batteryWidgetElement.getBoundingClientRect();
        batteryWidgetElement.style.left = `${rect.left}px`;
        batteryWidgetElement.style.top = `${rect.top}px`;
        batteryWidgetElement.style.right = "auto";
    }
    startDragging(e, batteryWidgetElement, {
        setDragging: (v) => (isDraggingBattery = v),
        setOffsetX: (v) => (batteryOffsetX = v),
        setOffsetY: (v) => (batteryOffsetY = v),
    }, handleBatteryPointerMove, handleBatteryPointerUp);
}
function handleBatteryPointerMove(e) {
    dragMove(e, batteryWidgetElement, {
        isDragging: isDraggingBattery,
        offsetX: batteryOffsetX,
        offsetY: batteryOffsetY,
    });
}
function handleBatteryPointerUp(e) {
    stopDragging(batteryWidgetElement, { setDragging: (v) => (isDraggingBattery = v) }, handleBatteryPointerMove, LSK.batteryPos, e);
}
function handleTodoPointerDown(e) {
    startDragging(e, todoWidgetElement, {
        setDragging: (v) => (isDraggingTodo = v),
        setOffsetX: (v) => (todoOffsetX = v),
        setOffsetY: (v) => (todoOffsetY = v),
    }, handleTodoPointerMove, handleTodoPointerUp);
}
function handleTodoPointerMove(e) {
    dragMove(e, todoWidgetElement, {
        isDragging: isDraggingTodo,
        offsetX: todoOffsetX,
        offsetY: todoOffsetY,
    });
}
function handleTodoPointerUp(e) {
    stopDragging(todoWidgetElement, { setDragging: (v) => (isDraggingTodo = v) }, handleTodoPointerMove, LSK.todoPos, e);
}
function handlePomodoroPointerDown(e) {
    startDragging(e, pomodoroWidgetElement, {
        setDragging: (v) => (isDraggingPomodoro = v),
        setOffsetX: (v) => (pomodoroOffsetX = v),
        setOffsetY: (v) => (pomodoroOffsetY = v),
    }, handlePomodoroPointerMove, handlePomodoroPointerUp);
}
function handlePomodoroPointerMove(e) {
    dragMove(e, pomodoroWidgetElement, {
        isDragging: isDraggingPomodoro,
        offsetX: pomodoroOffsetX,
        offsetY: pomodoroOffsetY,
    });
}
function handlePomodoroPointerUp(e) {
    stopDragging(pomodoroWidgetElement, { setDragging: (v) => (isDraggingPomodoro = v) }, handlePomodoroPointerMove, LSK.pomodoroPos, e);
}
// --- To-Do Resizing Logic ---
function handleTodoResizePointerDown(e) {
    if (!todoWidgetElement)
        return;
    e.stopPropagation();
    e.preventDefault();
    isResizingTodo = true;
    try {
        todoWidgetElement.setPointerCapture(e.pointerId);
    }
    catch (err) {
        console.error("Resize capture failed:", err);
        return;
    }
    todoWidgetElement.classList.add("resizing");
    document.body.style.cursor = "nwse-resize";
    document.body.style.userSelect = "none";
    if (navbar)
        navbarHeight = navbar.offsetHeight;
    initialTodoWidth = todoWidgetElement.offsetWidth;
    initialTodoHeight = todoWidgetElement.offsetHeight;
    initialMouseX = e.clientX;
    initialMouseY = e.clientY;
    document.addEventListener("pointermove", handleTodoResizePointerMove);
    document.addEventListener("pointerup", handleTodoResizePointerUp, {
        once: true,
    });
}
function handleTodoResizePointerMove(e) {
    if (!isResizingTodo || !todoWidgetElement)
        return;
    e.preventDefault();
    const deltaX = e.clientX - initialMouseX;
    const deltaY = e.clientY - initialMouseY;
    let newWidth = initialTodoWidth + deltaX;
    let newHeight = initialTodoHeight + deltaY;
    const rect = todoWidgetElement.getBoundingClientRect();
    newWidth = Math.max(MIN_WIDGET_WIDTH, Math.min(window.innerWidth - rect.left - WIDGET_POSITION_PADDING, newWidth));
    newHeight = Math.max(MIN_WIDGET_HEIGHT, Math.min(window.innerHeight - rect.top - WIDGET_POSITION_PADDING, newHeight));
    todoWidgetElement.style.width = `${newWidth}px`;
    todoWidgetElement.style.height = `${newHeight}px`;
}
function handleTodoResizePointerUp(e) {
    if (!isResizingTodo)
        return;
    isResizingTodo = false;
    if (todoWidgetElement) {
        todoWidgetElement.classList.remove("resizing");
        if (e === null || e === void 0 ? void 0 : e.pointerId) {
            try {
                todoWidgetElement.releasePointerCapture(e.pointerId);
            }
            catch (err) { }
        }
    }
    document.body.style.cursor = "";
    document.body.style.userSelect = "";
    document.removeEventListener("pointermove", handleTodoResizePointerMove);
}
// --- Utility Function ---
function addRemoveClassesOfMultipleElements(c) {
    const process = (map, action) => {
        if (map) {
            for (const [className, elements] of Object.entries(map)) {
                if (Array.isArray(elements)) {
                    elements
                        .filter((el) => el !== null)
                        .forEach((el) => el.classList[action](className));
                }
            }
        }
    };
    process(c === null || c === void 0 ? void 0 : c.toAdd, "add");
    process(c === null || c === void 0 ? void 0 : c.toRemove, "remove");
}
// --- Dropdown Actions ---
function handleCopyLink() {
    return __awaiter(this, void 0, void 0, function* () {
        if (!copyLinkButton) {
            console.error("Copy link button not found.");
            return;
        }
        const button = copyLinkButton;
        try {
            yield navigator.clipboard.writeText(SITE_URL);
            let tooltip = bootstrap.Tooltip.getInstance(button);
            if (!tooltip) {
                tooltip = new bootstrap.Tooltip(button, { trigger: "manual" });
            }
            const originalTitle = button.getAttribute("data-bs-original-title") || "Copy Link";
            button.setAttribute("data-bs-original-title", "Copied!");
            tooltip.show();
            setTimeout(() => {
                tooltip === null || tooltip === void 0 ? void 0 : tooltip.hide();
                button.setAttribute("data-bs-original-title", originalTitle);
            }, 1500);
        }
        catch (err) {
            console.error("Failed to copy link: ", err);
            alert("Failed to copy link to clipboard.");
        }
    });
}
function handleShare() {
    return __awaiter(this, void 0, void 0, function* () {
        if (navigator.share) {
            try {
                yield navigator.share({
                    title: SITE_TITLE,
                    text: `Keep your screen awake with ${SITE_TITLE}!`,
                    url: SITE_URL,
                });
                console.log("Shared successfully");
            }
            catch (err) {
                if (err.name !== "AbortError") {
                    console.error("Error sharing:", err);
                    alert("Could not share the app. Link copied instead!");
                    handleCopyLink();
                }
                else {
                    console.log("Share cancelled by user.");
                }
            }
        }
        else {
            console.warn("Web Share API not supported. Copying link instead.");
            alert("Web Share not supported on this browser/device. Link copied instead!");
            handleCopyLink();
        }
    });
}
function handleInstallPWA() {
    return __awaiter(this, void 0, void 0, function* () {
        if (!deferredInstallPrompt) {
            console.log("Install prompt is not available.");
            if (installPWAItem) {
                installPWAItem.style.display = "none";
            }
            return;
        }
        try {
            yield deferredInstallPrompt.prompt();
            console.log("Install prompt shown.");
            const { outcome } = yield deferredInstallPrompt.userChoice;
            console.log(`User response to the install prompt: ${outcome}`);
            if (installPWAItem) {
                installPWAItem.style.display = "none";
            }
            deferredInstallPrompt = null;
        }
        catch (err) {
            console.error("Error showing install prompt:", err);
            deferredInstallPrompt = null;
            if (installPWAItem) {
                installPWAItem.style.display = "none";
            }
        }
    });
}
// --- Main Initialization ---
function initializeApp() {
    console.log("Initializing App...");
    // --- 1. Query DOM Elements ---
    navbar = document.getElementById("navbar");
    favicon = document.getElementById("web-icon");
    keepAwakeSwitch = document.getElementById("keep-awake-switch");
    digitalClockElement = document.getElementById("digital-clock");
    userGreetingElement = document.getElementById("user-greeting");
    clockFormatSwitch = document.getElementById("clock-format-switch");
    showClockWidgetSwitch = document.getElementById("show-clock-widget-switch");
    showPomodoroWidgetSwitch = document.getElementById("show-pomodoro-widget-switch");
    showBatteryWidgetSwitch = document.getElementById("show-battery-widget-switch");
    showTodoWidgetSwitch = document.getElementById("show-todo-widget-switch");
    minimalModeSwitch = document.getElementById("minimal-mode-switch");
    copyLinkButton = document.getElementById("copy-link-btn");
    shareButton = document.getElementById("share-btn");
    editNameButton = document.getElementById("edit-name-btn");
    installPWAItem = document.getElementById("install-pwa-item");
    installPWAButton = document.getElementById("install-pwa-btn");
    heroSection = document.getElementById("hero-section");
    statusText = document.getElementById("screen-status");
    infoDisclaimerElement = document.getElementById("info-disclaimer");
    batteryWidgetElement = document.getElementById("battery-widget");
    todoWidgetElement = document.getElementById("todo-widget");
    pomodoroWidgetElement = document.getElementById("pomodoro-widget");
    addTodoButtonElement = document.getElementById("add-todo-button");
    startPomodoroButtonElement = document.getElementById("start-pomodoro-btn");
    helpModalElement = document.getElementById("helpModal");
    // --- 2. Initialize Bootstrap Tooltips ---
    const tooltipTriggerList = Array.from(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.forEach((tooltipTriggerEl) => {
        if (tooltipTriggerEl instanceof HTMLElement) {
            if (tooltipTriggerEl.id === "copy-link-btn") {
                new bootstrap.Tooltip(tooltipTriggerEl, { trigger: "manual" });
            }
            else {
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
    if (clockFormatSwitch)
        clockFormatSwitch.checked = is12HourFormat;
    if (showClockWidgetSwitch)
        showClockWidgetSwitch.checked = clockWidgetVisible;
    if (showPomodoroWidgetSwitch)
        showPomodoroWidgetSwitch.checked = pomodoroVisible;
    if (showBatteryWidgetSwitch)
        showBatteryWidgetSwitch.checked = batteryVisible;
    if (showTodoWidgetSwitch)
        showTodoWidgetSwitch.checked = todoVisible;
    if (minimalModeSwitch)
        minimalModeSwitch.checked = minimalModeActive;
    // --- 5. Initialize Core Features & Widgets ---
    updateClock();
    if (clockInterval)
        clearInterval(clockInterval);
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
    keepAwakeSwitch === null || keepAwakeSwitch === void 0 ? void 0 : keepAwakeSwitch.addEventListener("change", changeSwitch);
    clockFormatSwitch === null || clockFormatSwitch === void 0 ? void 0 : clockFormatSwitch.addEventListener("change", handleClockFormatToggle);
    showClockWidgetSwitch === null || showClockWidgetSwitch === void 0 ? void 0 : showClockWidgetSwitch.addEventListener("change", handleShowClockToggle);
    showPomodoroWidgetSwitch === null || showPomodoroWidgetSwitch === void 0 ? void 0 : showPomodoroWidgetSwitch.addEventListener("change", handleShowPomodoroToggle);
    showBatteryWidgetSwitch === null || showBatteryWidgetSwitch === void 0 ? void 0 : showBatteryWidgetSwitch.addEventListener("change", handleShowBatteryToggle);
    showTodoWidgetSwitch === null || showTodoWidgetSwitch === void 0 ? void 0 : showTodoWidgetSwitch.addEventListener("change", handleShowTodoToggle);
    minimalModeSwitch === null || minimalModeSwitch === void 0 ? void 0 : minimalModeSwitch.addEventListener("change", handleMinimalModeToggle);
    copyLinkButton === null || copyLinkButton === void 0 ? void 0 : copyLinkButton.addEventListener("click", handleCopyLink);
    shareButton === null || shareButton === void 0 ? void 0 : shareButton.addEventListener("click", handleShare);
    editNameButton === null || editNameButton === void 0 ? void 0 : editNameButton.addEventListener("click", handleEditNameClick);
    installPWAButton === null || installPWAButton === void 0 ? void 0 : installPWAButton.addEventListener("click", handleInstallPWA);
    // --- 8. Set Initial NoSleep State and UI ---
    if (keepAwakeSwitch) {
        const isChecked = keepAwakeSwitch.checked;
        changeStatusText(isChecked);
        changeBackground(isChecked);
        changeFavicon(isChecked);
        if (isChecked) {
            nosleep.enable().catch(handleNoSleepError);
        }
    }
    else {
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
                .then((registration) => console.log("Service Worker registered with scope:", registration.scope))
                .catch((error) => console.error("Service Worker registration failed:", error));
        });
    }
    else {
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
    if (isPomodoroRunning)
        savePomodoroState();
});
window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferredInstallPrompt = e;
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
