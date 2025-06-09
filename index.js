var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import NoSleep from "./nosleep/nosleep.js";
// --- END: Type Definitions ---
// --- DOM Element Variables ---
// (No changes needed here)
var heroSection = null, navbar = null, statusText = null, favicon = null, keepAwakeSwitch = null, digitalClockElement = null, userGreetingElement = null, clockFormatSwitch = null, 
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
var nosleep = new NoSleep(), userName = null, clockInterval = null, is12HourFormat = false, clockWidgetVisible = true, pomodoroVisible = true, batteryVisible = true, todoVisible = true, minimalModeActive = false, deferredInstallPrompt = null, isDraggingClock = false, clockOffsetX = 0, clockOffsetY = 0, isDraggingBattery = false, batteryOffsetX = 0, batteryOffsetY = 0, isDraggingTodo = false, todoOffsetX = 0, todoOffsetY = 0, isDraggingPomodoro = false, pomodoroOffsetX = 0, pomodoroOffsetY = 0, isResizingTodo = false, initialTodoWidth = 0, initialTodoHeight = 0, initialMouseX = 0, initialMouseY = 0, navbarHeight = 0;
var todos = [];
var pomodoroMode = "pomodoro", pomodoroTotalDuration = 25 * 60, pomodoroRemainingTime = pomodoroTotalDuration, pomodoroInterval = null, isPomodoroRunning = false;
// --- Constants ---
var LSK = {
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
var SITE_URL = window.location.href;
var SITE_TITLE = document.title;
var MIN_WIDGET_WIDTH = 250;
var MIN_WIDGET_HEIGHT = 180;
var WIDGET_POSITION_PADDING = 10;
var POMODORO_DURATION = 25 * 60;
var SHORT_BREAK_DURATION = 5 * 60;
var LONG_BREAK_DURATION = 15 * 60;
var POMODORO_FINISHED_SOUND_URL = "https://pomofocus.io/audios/alarms/alarm-wood.mp3";
// <<< START: ADDED FOR BMC WIDGET >>>
var BMC_AWAKE_COLOR = "#40DCA5";
var BMC_SLEEPY_COLOR = "#008dd5";
// <<< END: ADDED FOR BMC WIDGET >>>
// --- Utility: Safe Element Access ---
function ensureElements(elements) {
    for (var key in elements) {
        var el = elements[key];
        if (!el || (el instanceof NodeList && el.length === 0)) {
            console.error("Initialization failed: Element(s) for '".concat(key, "' not found."));
            return false;
        }
    }
    return true;
}
// --- Error Handling ---
function handleNoSleepError(err) {
    var message = "NoSleep Error";
    if (err instanceof Error) {
        message += ": ".concat(err.name, ", ").concat(err.message);
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
    var bmcButton = document.getElementById("bmc-wbtn");
    if (bmcButton) {
        // The color is controlled by the 'background-color' style property.
        bmcButton.style.backgroundColor = isAwake
            ? BMC_AWAKE_COLOR
            : BMC_SLEEPY_COLOR;
    }
}
// <<< END: NEW FUNCTION FOR BMC WIDGET >>>
function changeSwitch(event) {
    var target = event.target;
    if ((target === null || target === void 0 ? void 0 : target.checked) !== undefined) {
        var isChecked_1 = target.checked;
        var action = isChecked_1
            ? nosleep.enable()
            : Promise.resolve(nosleep.disable());
        action
            .then(function () {
            changeBackground(isChecked_1);
            changeStatusText(isChecked_1);
            changeFavicon(isChecked_1);
            updatePomodoroModeButtonsUI();
        })
            .catch(function (err) {
            handleNoSleepError(err);
            if (keepAwakeSwitch) {
                keepAwakeSwitch.checked = false;
            }
        });
    }
}
function changeBackground(isAwake) {
    var baseHighlightTargets = [];
    if (navbar)
        baseHighlightTargets.push(navbar.querySelector(".navbar-brand span"));
    if (userGreetingElement)
        baseHighlightTargets.push(userGreetingElement.querySelector(".user-name"));
    var disclaimerHighlightSpan = infoDisclaimerElement === null || infoDisclaimerElement === void 0 ? void 0 : infoDisclaimerElement.querySelector("span");
    if (disclaimerHighlightSpan instanceof HTMLElement)
        baseHighlightTargets.push(disclaimerHighlightSpan);
    var uniqueTextHighlights = Array.from(new Set(baseHighlightTargets.filter(function (el) { return el !== null; })));
    var icons = [];
    [
        digitalClockWidgetElement,
        batteryWidgetElement,
        todoWidgetElement,
        pomodoroWidgetElement,
    ].forEach(function (widget) {
        if (widget)
            icons.push(widget.querySelector(".widget-header .widget-icon"));
    });
    var generalButtons = [
        addTodoButtonElement,
        startPomodoroButtonElement,
    ];
    var statusElement = [statusText];
    var classToAdd = isAwake ? "background-enabled" : "background-disabled";
    var classToRemove = isAwake ? "background-disabled" : "background-enabled";
    document.documentElement.classList.add(classToAdd);
    document.documentElement.classList.remove(classToRemove);
    var highlightClassMap = isAwake
        ? {
            toAdd: {
                "highlight-text": __spreadArray(__spreadArray([], uniqueTextHighlights, true), statusElement, true),
                "icon-highlight-primary": icons,
                "button-bg-primary": generalButtons,
            },
            toRemove: {
                "secondary-highlight-text": __spreadArray(__spreadArray([], uniqueTextHighlights, true), statusElement, true),
                "icon-highlight-secondary": icons,
                "button-bg-secondary": generalButtons,
            },
        }
        : {
            toAdd: {
                "secondary-highlight-text": __spreadArray(__spreadArray([], uniqueTextHighlights, true), statusElement, true),
                "icon-highlight-secondary": icons,
                "button-bg-secondary": generalButtons,
            },
            toRemove: {
                "highlight-text": __spreadArray(__spreadArray([], uniqueTextHighlights, true), statusElement, true),
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
    var h = new Date().getHours();
    return h >= 5 && h < 12
        ? "Good Morning"
        : h >= 12 && h < 18
            ? "Good Afternoon"
            : "Good Evening";
}
function updateGreeting() {
    if (userGreetingElement && userName) {
        userGreetingElement.innerHTML = "".concat(getGreetingPrefix(), ", <span class=\"user-name\">").concat(userName, "</span>!");
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
    var now = new Date();
    var formattedTime = formatTimePart(now, is12HourFormat);
    var formattedDate = formatDatePart(now);
    var fullDateTimeString = "".concat(formattedDate, ", ").concat(formattedTime);
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
    var t = e.target;
    if (t) {
        is12HourFormat = t.checked;
        localStorage.setItem(LSK.clockFormat, is12HourFormat ? "12h" : "24h");
        updateClock();
    }
}
// --- Widget Visibility ---
// (No changes needed here)
function applyAllWidgetVisibilities() {
    var hideAllWidgets = minimalModeActive;
    var shouldShowClock = !hideAllWidgets && clockWidgetVisible;
    var shouldShowPomodoro = !hideAllWidgets && pomodoroVisible;
    var shouldShowBattery = !hideAllWidgets && batteryVisible;
    var shouldShowTodo = !hideAllWidgets && todoVisible;
    digitalClockWidgetElement === null || digitalClockWidgetElement === void 0 ? void 0 : digitalClockWidgetElement.classList.toggle("widget-hidden", !shouldShowClock);
    pomodoroWidgetElement === null || pomodoroWidgetElement === void 0 ? void 0 : pomodoroWidgetElement.classList.toggle("widget-hidden", !shouldShowPomodoro);
    batteryWidgetElement === null || batteryWidgetElement === void 0 ? void 0 : batteryWidgetElement.classList.toggle("widget-hidden", !shouldShowBattery);
    todoWidgetElement === null || todoWidgetElement === void 0 ? void 0 : todoWidgetElement.classList.toggle("widget-hidden", !shouldShowTodo);
    var disableIndividualToggles = minimalModeActive;
    [
        showClockWidgetSwitch,
        showPomodoroWidgetSwitch,
        showBatteryWidgetSwitch,
        showTodoWidgetSwitch,
    ].forEach(function (widgetSwitch) {
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
    var target = event.target;
    if (target) {
        clockWidgetVisible = target.checked;
        localStorage.setItem(LSK.clockWidgetVisible, clockWidgetVisible ? "true" : "false");
        applyAllWidgetVisibilities();
    }
}
function handleShowPomodoroToggle(event) {
    var target = event.target;
    if (target) {
        pomodoroVisible = target.checked;
        localStorage.setItem(LSK.pomodoroVisible, pomodoroVisible ? "true" : "false");
        applyAllWidgetVisibilities();
    }
}
function handleShowBatteryToggle(event) {
    var target = event.target;
    if (target) {
        batteryVisible = target.checked;
        localStorage.setItem(LSK.batteryVisible, batteryVisible ? "true" : "false");
        applyAllWidgetVisibilities();
    }
}
function handleShowTodoToggle(event) {
    var target = event.target;
    if (target) {
        todoVisible = target.checked;
        localStorage.setItem(LSK.todoVisible, todoVisible ? "true" : "false");
        applyAllWidgetVisibilities();
    }
}
function handleMinimalModeToggle(event) {
    var target = event.target;
    if (target) {
        minimalModeActive = target.checked;
        localStorage.setItem(LSK.minimalModeActive, minimalModeActive ? "true" : "false");
        applyAllWidgetVisibilities();
    }
}
// --- Name Prompt & Edit ---
// (No changes needed here)
function handleNameSubmit() {
    var n = userNameInputElement === null || userNameInputElement === void 0 ? void 0 : userNameInputElement.value.trim();
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
function initializeAndMaybeShowNamePrompt(show) {
    if (show === void 0) { show = false; }
    namePromptModalElement = document.getElementById("namePromptModal");
    userNameInputElement = document.getElementById("userNameInput");
    submitNameButtonElement = document.getElementById("submitNameButton");
    nameInputErrorElement = document.getElementById("nameInputError");
    if (ensureElements({
        namePromptModalElement: namePromptModalElement,
        userNameInputElement: userNameInputElement,
        submitNameButtonElement: submitNameButtonElement,
        nameInputErrorElement: nameInputErrorElement,
    })) {
        if (!namePromptModalInstance) {
            namePromptModalInstance = bootstrap.Modal.getOrCreateInstance(namePromptModalElement);
            submitNameButtonElement.addEventListener("click", handleNameSubmit);
            userNameInputElement.addEventListener("keypress", handleEnterKey);
            namePromptModalElement.addEventListener("shown.bs.modal", function () {
                return userNameInputElement === null || userNameInputElement === void 0 ? void 0 : userNameInputElement.focus();
            });
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
    var level = battery.level;
    var percentage = Math.round(level * 100);
    var isCharging = battery.charging;
    var isLow = !isCharging && level <= 0.2;
    batteryPercentageValueElement.innerText = percentage.toString();
    batteryLevelElement.style.height = "".concat(percentage, "%");
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
            .then(function (batteryManager) {
            batteryWidgetElement = document.getElementById("battery-widget");
            batteryLevelElement = document.getElementById("battery-level");
            batteryPercentageValueElement = document.getElementById("battery-percentage-value");
            batteryChargingStatusElement = document.getElementById("battery-charging-status");
            batteryLowStatusElement = document.getElementById("battery-low-status");
            if (ensureElements({
                batteryWidgetElement: batteryWidgetElement,
                batteryLevelElement: batteryLevelElement,
                batteryPercentageValueElement: batteryPercentageValueElement,
                batteryChargingStatusElement: batteryChargingStatusElement,
                batteryLowStatusElement: batteryLowStatusElement,
            })) {
                updateBatteryUI(batteryManager);
                batteryManager.addEventListener("levelchange", function () {
                    return updateBatteryUI(batteryManager);
                });
                batteryManager.addEventListener("chargingchange", function () {
                    return updateBatteryUI(batteryManager);
                });
                var header = batteryWidgetElement.querySelector(".widget-header");
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
            .catch(function (error) {
            var _a;
            var message = "Battery API error";
            if (error instanceof Error)
                message += ": ".concat(error.message);
            console.error(message, error);
            var widget = document.getElementById("battery-widget");
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
        var widget = document.getElementById("battery-widget");
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
    var s = localStorage.getItem(LSK.todos);
    try {
        if (s) {
            var p = JSON.parse(s);
            if (Array.isArray(p) &&
                p.every(function (i) {
                    return typeof i === "object" &&
                        i !== null &&
                        typeof i.id === "number" &&
                        typeof i.text === "string" &&
                        typeof i.completed === "boolean";
                })) {
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
        var li = document.createElement("li");
        li.textContent = "No tasks yet!";
        li.style.textAlign = "center";
        li.style.color = "var(--text-dim)";
        li.style.padding = "10px 0";
        todoListElement.appendChild(li);
        return;
    }
    todos.forEach(function (todo) {
        var li = document.createElement("li");
        li.className = "todo-item";
        li.dataset.id = String(todo.id);
        if (todo.completed) {
            li.classList.add("completed");
        }
        var cb = document.createElement("input");
        cb.type = "checkbox";
        cb.checked = todo.completed;
        cb.addEventListener("change", function () { return toggleTodo(todo.id); });
        cb.setAttribute("aria-label", "Mark task \"".concat(todo.text, "\" as ").concat(todo.completed ? "incomplete" : "complete"));
        var span = document.createElement("span");
        span.textContent = todo.text;
        var btn = document.createElement("button");
        btn.className = "delete-todo-btn";
        btn.innerHTML = '<i class="fas fa-trash-alt" aria-hidden="true"></i>';
        btn.title = "Delete task \"".concat(todo.text, "\"");
        btn.setAttribute("aria-label", "Delete task \"".concat(todo.text, "\""));
        btn.addEventListener("click", function () { return deleteTodo(todo.id); });
        li.append(cb, span, btn);
        todoListElement.appendChild(li);
    });
}
function addTodo() {
    var t = newTodoInputElement === null || newTodoInputElement === void 0 ? void 0 : newTodoInputElement.value.trim();
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
    todos = todos.map(function (t) {
        return t.id === id ? __assign(__assign({}, t), { completed: !t.completed }) : t;
    });
    saveTodos();
    renderTodos();
}
function deleteTodo(id) {
    todos = todos.filter(function (t) { return t.id !== id; });
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
            todoWidgetElement: todoWidgetElement,
            todoListElement: todoListElement,
            newTodoInputElement: newTodoInputElement,
            addTodoButtonElement: addTodoButtonElement,
            todoResizeHandleElement: todoResizeHandleElement,
        })) {
            loadTodos();
            renderTodos();
            addTodoButtonElement.addEventListener("click", addTodo);
            newTodoInputElement.addEventListener("keypress", function (event) {
                if (event.key === "Enter") {
                    event.preventDefault();
                    addTodo();
                }
            });
            var header = todoWidgetElement.querySelector(".widget-header");
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
    var m = Math.floor(s / 60);
    var c = s % 60;
    return "".concat(String(m).padStart(2, "0"), ":").concat(String(c).padStart(2, "0"));
}
function updatePomodoroDisplay() {
    if (pomodoroTimeDisplayElement) {
        pomodoroTimeDisplayElement.innerText = formatPomodoroTime(pomodoroRemainingTime);
        var isPomodoroWidgetVisible = !(pomodoroWidgetElement === null || pomodoroWidgetElement === void 0 ? void 0 : pomodoroWidgetElement.classList.contains("widget-hidden"));
        if (isPomodoroRunning && isPomodoroWidgetVisible) {
            var modeText = pomodoroMode === "pomodoro" ? "Focus" : "Break";
            document.title = "".concat(formatPomodoroTime(pomodoroRemainingTime), " - ").concat(modeText, " | ").concat(SITE_TITLE);
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
    var ss = !isPomodoroRunning;
    var sp = isPomodoroRunning;
    var sr = sp || (!isPomodoroRunning && pomodoroRemainingTime < pomodoroTotalDuration);
    startPomodoroButtonElement.style.display = ss ? "inline-block" : "none";
    pausePomodoroButtonElement.style.display = sp ? "inline-block" : "none";
    resetPomodoroButtonElement.style.display = sr ? "inline-block" : "none";
}
function savePomodoroState() {
    var s = {
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
    var j = localStorage.getItem(LSK.pomodoroState);
    var l = false;
    if (j) {
        try {
            var s = JSON.parse(j);
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
                    var n = Date.now();
                    var e = Math.floor((n - s.lastTickTimestamp) / 1000);
                    pomodoroRemainingTime = Math.max(0, pomodoroRemainingTime - e);
                    if (pomodoroRemainingTime === 0) {
                        isPomodoroRunning = false;
                        console.log("Pomodoro (".concat(pomodoroMode, ") finished while inactive."));
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
            console.warn("Unknown Pomodoro mode: ".concat(m, ". Using default duration."));
            return POMODORO_DURATION;
    }
}
function updatePomodoroModeButtonsUI() {
    var _a;
    if (!pomodoroModeButtons)
        return;
    var isAwakeActive = (_a = keepAwakeSwitch === null || keepAwakeSwitch === void 0 ? void 0 : keepAwakeSwitch.checked) !== null && _a !== void 0 ? _a : true;
    pomodoroModeButtons.forEach(function (b) {
        var isCurrentMode = b.dataset.mode === pomodoroMode;
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
function startPomodoroTimer(sv) {
    if (sv === void 0) { sv = true; }
    if (isPomodoroRunning || pomodoroRemainingTime <= 0)
        return;
    isPomodoroRunning = true;
    updatePomodoroControls();
    if (sv)
        savePomodoroState();
    if (pomodoroInterval)
        clearInterval(pomodoroInterval);
    var tick = function () {
        if (!isPomodoroRunning) {
            clearInterval(pomodoroInterval);
            pomodoroInterval = null;
            return;
        }
        pomodoroRemainingTime--;
        updatePomodoroDisplay();
        if (pomodoroRemainingTime <= 0) {
            pomodoroFinishedSoundElement === null || pomodoroFinishedSoundElement === void 0 ? void 0 : pomodoroFinishedSoundElement.play().catch(function (err) { return console.error("Error playing sound:", err); });
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
            console.log("Pomodoro Timer (".concat(pomodoroMode, ") finished!"));
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
function pausePomodoroTimer(sv) {
    if (sv === void 0) { sv = true; }
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
function resetPomodoroTimer(sv) {
    if (sv === void 0) { sv = true; }
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
        pomodoroWidgetElement: pomodoroWidgetElement,
        pomodoroModeButtons: pomodoroModeButtons,
        pomodoroTimeDisplayElement: pomodoroTimeDisplayElement,
        startPomodoroButtonElement: startPomodoroButtonElement,
        pausePomodoroButtonElement: pausePomodoroButtonElement,
        resetPomodoroButtonElement: resetPomodoroButtonElement,
        pomodoroFinishedSoundElement: pomodoroFinishedSoundElement,
        pomodoroFinishedAlertModalElement: pomodoroFinishedAlertModalElement,
        pomodoroFinishedAlertModalLabelElement: pomodoroFinishedAlertModalLabelElement,
        pomodoroFinishedAlertMessageElement: pomodoroFinishedAlertMessageElement,
    })) {
        loadPomodoroState();
        pomodoroModeButtons.forEach(function (button) {
            button.addEventListener("click", function () {
                var mode = button.dataset.mode;
                if (mode)
                    switchPomodoroMode(mode);
            });
        });
        startPomodoroButtonElement.addEventListener("click", function () {
            return startPomodoroTimer();
        });
        pausePomodoroButtonElement.addEventListener("click", function () {
            return pausePomodoroTimer();
        });
        resetPomodoroButtonElement.addEventListener("click", function () {
            return resetPomodoroTimer();
        });
        var header = pomodoroWidgetElement.querySelector(".widget-header");
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
        digitalClockWidgetElement: digitalClockWidgetElement,
        widgetDigitalDateDisplayElement: widgetDigitalDateDisplayElement,
        widgetDigitalTimeDisplayElement: widgetDigitalTimeDisplayElement,
    })) {
        var header = digitalClockWidgetElement.querySelector(".widget-header");
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
    var s = window.getComputedStyle(e);
    var p = { top: s.top, left: s.left };
    if (p.top === "auto" || p.left === "auto") {
        return;
    }
    try {
        localStorage.setItem(k, JSON.stringify(p));
    }
    catch (e) {
        console.error("Error saving ".concat(k, ":"), e);
    }
}
function loadWidgetPosition(k, e, dT, dL, dR) {
    var _a, _b;
    if (!e || !k)
        return;
    var p = null;
    var j = localStorage.getItem(k);
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
            console.error("Error parsing ".concat(k, ":"), e);
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
    requestAnimationFrame(function () {
        try {
            if (navbar)
                navbarHeight = navbar.offsetHeight;
            var r = e.getBoundingClientRect();
            if (r.width > 0 && r.height > 0) {
                var cT = r.top;
                var cL = r.left;
                var maxTop = window.innerHeight - r.height - WIDGET_POSITION_PADDING;
                var maxLeft = window.innerWidth - r.width - WIDGET_POSITION_PADDING;
                var minTop = navbarHeight + WIDGET_POSITION_PADDING;
                var minLeft = WIDGET_POSITION_PADDING;
                var clampedTop = Math.max(minTop, Math.min(maxTop, cT));
                var clampedLeft = Math.max(minLeft, Math.min(maxLeft, cL));
                if (clampedTop !== cT) {
                    e.style.top = "".concat(clampedTop, "px");
                }
                if (clampedLeft !== cL) {
                    e.style.left = "".concat(clampedLeft, "px");
                    e.style.right = "auto";
                }
            }
        }
        catch (err) {
            console.error("Error during clamping for ".concat(k, ":"), err);
        }
    });
    e.style.bottom = "auto";
    e.style.transform = "none";
}
function loadAllWidgetPositions() {
    var defaultClockTop = "400px";
    var defaultClockLeft = "20px";
    var defaultBatteryTop = "100px";
    var defaultBatteryRight = "20px";
    var defaultTodoTop = "100px";
    var defaultTodoLeft = "20px";
    var defaultPomodoroTop = "240px";
    var defaultPomodoroLeft = "20px";
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
    var targetElement = event.target;
    var header = element.querySelector(".widget-header");
    var dragHandle = element.querySelector(".widget-drag-handle");
    var canDrag = false;
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
    var rect = element.getBoundingClientRect();
    stateSetters.setOffsetX(event.clientX - rect.left);
    stateSetters.setOffsetY(event.clientY - rect.top);
    document.addEventListener("pointermove", moveHandler);
    document.addEventListener("pointerup", upHandler, { once: true });
}
function dragMove(e, el, s) {
    if (!s.isDragging || !el)
        return;
    e.preventDefault();
    var w = el.offsetWidth, h = el.offsetHeight;
    var newTop = e.clientY - s.offsetY, newLeft = e.clientX - s.offsetX;
    var maxTop = window.innerHeight - h - WIDGET_POSITION_PADDING;
    var maxLeft = window.innerWidth - w - WIDGET_POSITION_PADDING;
    var minTop = navbarHeight + WIDGET_POSITION_PADDING;
    var minLeft = WIDGET_POSITION_PADDING;
    newTop = Math.max(minTop, Math.min(maxTop, newTop));
    newLeft = Math.max(minLeft, Math.min(maxLeft, newLeft));
    el.style.left = "".concat(newLeft, "px");
    el.style.top = "".concat(newTop, "px");
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
        setDragging: function (v) { return (isDraggingClock = v); },
        setOffsetX: function (v) { return (clockOffsetX = v); },
        setOffsetY: function (v) { return (clockOffsetY = v); },
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
    stopDragging(digitalClockWidgetElement, { setDragging: function (v) { return (isDraggingClock = v); } }, handleClockPointerMove, LSK.clockWidgetPos, event);
}
function handleBatteryPointerDown(e) {
    if (batteryWidgetElement &&
        window.getComputedStyle(batteryWidgetElement).left === "auto") {
        var rect = batteryWidgetElement.getBoundingClientRect();
        batteryWidgetElement.style.left = "".concat(rect.left, "px");
        batteryWidgetElement.style.top = "".concat(rect.top, "px");
        batteryWidgetElement.style.right = "auto";
    }
    startDragging(e, batteryWidgetElement, {
        setDragging: function (v) { return (isDraggingBattery = v); },
        setOffsetX: function (v) { return (batteryOffsetX = v); },
        setOffsetY: function (v) { return (batteryOffsetY = v); },
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
    stopDragging(batteryWidgetElement, { setDragging: function (v) { return (isDraggingBattery = v); } }, handleBatteryPointerMove, LSK.batteryPos, e);
}
function handleTodoPointerDown(e) {
    startDragging(e, todoWidgetElement, {
        setDragging: function (v) { return (isDraggingTodo = v); },
        setOffsetX: function (v) { return (todoOffsetX = v); },
        setOffsetY: function (v) { return (todoOffsetY = v); },
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
    stopDragging(todoWidgetElement, { setDragging: function (v) { return (isDraggingTodo = v); } }, handleTodoPointerMove, LSK.todoPos, e);
}
function handlePomodoroPointerDown(e) {
    startDragging(e, pomodoroWidgetElement, {
        setDragging: function (v) { return (isDraggingPomodoro = v); },
        setOffsetX: function (v) { return (pomodoroOffsetX = v); },
        setOffsetY: function (v) { return (pomodoroOffsetY = v); },
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
    stopDragging(pomodoroWidgetElement, { setDragging: function (v) { return (isDraggingPomodoro = v); } }, handlePomodoroPointerMove, LSK.pomodoroPos, e);
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
    var deltaX = e.clientX - initialMouseX;
    var deltaY = e.clientY - initialMouseY;
    var newWidth = initialTodoWidth + deltaX;
    var newHeight = initialTodoHeight + deltaY;
    var rect = todoWidgetElement.getBoundingClientRect();
    newWidth = Math.max(MIN_WIDGET_WIDTH, Math.min(window.innerWidth - rect.left - WIDGET_POSITION_PADDING, newWidth));
    newHeight = Math.max(MIN_WIDGET_HEIGHT, Math.min(window.innerHeight - rect.top - WIDGET_POSITION_PADDING, newHeight));
    todoWidgetElement.style.width = "".concat(newWidth, "px");
    todoWidgetElement.style.height = "".concat(newHeight, "px");
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
    var process = function (map, action) {
        if (map) {
            var _loop_1 = function (className, elements) {
                if (Array.isArray(elements)) {
                    elements
                        .filter(function (el) { return el !== null; })
                        .forEach(function (el) { return el.classList[action](className); });
                }
            };
            for (var _i = 0, _a = Object.entries(map); _i < _a.length; _i++) {
                var _b = _a[_i], className = _b[0], elements = _b[1];
                _loop_1(className, elements);
            }
        }
    };
    process(c === null || c === void 0 ? void 0 : c.toAdd, "add");
    process(c === null || c === void 0 ? void 0 : c.toRemove, "remove");
}
// --- Dropdown Actions ---
function handleCopyLink() {
    return __awaiter(this, void 0, void 0, function () {
        var button, tooltip_1, originalTitle_1, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!copyLinkButton) {
                        console.error("Copy link button not found.");
                        return [2 /*return*/];
                    }
                    button = copyLinkButton;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, navigator.clipboard.writeText(SITE_URL)];
                case 2:
                    _a.sent();
                    tooltip_1 = bootstrap.Tooltip.getInstance(button);
                    if (!tooltip_1) {
                        tooltip_1 = new bootstrap.Tooltip(button, { trigger: "manual" });
                    }
                    originalTitle_1 = button.getAttribute("data-bs-original-title") || "Copy Link";
                    button.setAttribute("data-bs-original-title", "Copied!");
                    tooltip_1.show();
                    setTimeout(function () {
                        tooltip_1 === null || tooltip_1 === void 0 ? void 0 : tooltip_1.hide();
                        button.setAttribute("data-bs-original-title", originalTitle_1);
                    }, 1500);
                    return [3 /*break*/, 4];
                case 3:
                    err_1 = _a.sent();
                    console.error("Failed to copy link: ", err_1);
                    alert("Failed to copy link to clipboard.");
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function handleShare() {
    return __awaiter(this, void 0, void 0, function () {
        var err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!navigator.share) return [3 /*break*/, 5];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, navigator.share({
                            title: SITE_TITLE,
                            text: "Keep your screen awake with ".concat(SITE_TITLE, "!"),
                            url: SITE_URL,
                        })];
                case 2:
                    _a.sent();
                    console.log("Shared successfully");
                    return [3 /*break*/, 4];
                case 3:
                    err_2 = _a.sent();
                    if (err_2.name !== "AbortError") {
                        console.error("Error sharing:", err_2);
                        alert("Could not share the app. Link copied instead!");
                        handleCopyLink();
                    }
                    else {
                        console.log("Share cancelled by user.");
                    }
                    return [3 /*break*/, 4];
                case 4: return [3 /*break*/, 6];
                case 5:
                    console.warn("Web Share API not supported. Copying link instead.");
                    alert("Web Share not supported on this browser/device. Link copied instead!");
                    handleCopyLink();
                    _a.label = 6;
                case 6: return [2 /*return*/];
            }
        });
    });
}
function handleInstallPWA() {
    return __awaiter(this, void 0, void 0, function () {
        var outcome, err_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!deferredInstallPrompt) {
                        console.log("Install prompt is not available.");
                        if (installPWAItem) {
                            installPWAItem.style.display = "none";
                        }
                        return [2 /*return*/];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, deferredInstallPrompt.prompt()];
                case 2:
                    _a.sent();
                    console.log("Install prompt shown.");
                    return [4 /*yield*/, deferredInstallPrompt.userChoice];
                case 3:
                    outcome = (_a.sent()).outcome;
                    console.log("User response to the install prompt: ".concat(outcome));
                    if (installPWAItem) {
                        installPWAItem.style.display = "none";
                    }
                    deferredInstallPrompt = null;
                    return [3 /*break*/, 5];
                case 4:
                    err_3 = _a.sent();
                    console.error("Error showing install prompt:", err_3);
                    deferredInstallPrompt = null;
                    if (installPWAItem) {
                        installPWAItem.style.display = "none";
                    }
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
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
    var tooltipTriggerList = Array.from(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.forEach(function (tooltipTriggerEl) {
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
        var isChecked = keepAwakeSwitch.checked;
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
        window.addEventListener("load", function () {
            navigator.serviceWorker
                .register("./service-worker.js")
                .then(function (registration) {
                return console.log("Service Worker registered with scope:", registration.scope);
            })
                .catch(function (error) {
                return console.error("Service Worker registration failed:", error);
            });
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
    var bmcInitTries = 0;
    var bmcInitInterval = setInterval(function () {
        var bmcButton = document.getElementById("bmc-wbtn");
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
window.addEventListener("beforeunload", function () {
    if (isPomodoroRunning)
        savePomodoroState();
});
window.addEventListener("beforeinstallprompt", function (e) {
    e.preventDefault();
    deferredInstallPrompt = e;
    console.log("`beforeinstallprompt` event fired. PWA install available.");
    if (installPWAItem) {
        installPWAItem.style.display = "block";
    }
});
window.addEventListener("appinstalled", function () {
    console.log("PWA was installed successfully!");
    if (installPWAItem) {
        installPWAItem.style.display = "none";
    }
    deferredInstallPrompt = null;
});
