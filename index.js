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
// These variables will hold references to HTML elements fetched from the DOM.
// Initialized to null, they are populated during the initializeApp function.
var heroSection = null, navbar = null, statusText = null, favicon = null, keepAwakeSwitch = null, digitalClockElement = null, // Clock in the main hero section
userGreetingElement = null, clockFormatSwitch = null, 
// Widget Toggles in Settings Dropdown
showClockWidgetSwitch = null, showPomodoroWidgetSwitch = null, showBatteryWidgetSwitch = null, showTodoWidgetSwitch = null, minimalModeSwitch = null, 
// Dropdown Action Buttons
copyLinkButton = null, shareButton = null, installPWAItem = null, // List item containing the install button
installPWAButton = null, 
// Modals
namePromptModalElement = null, userNameInputElement = null, submitNameButtonElement = null, nameInputErrorElement = null, namePromptModalInstance = null, // Bootstrap modal instance
helpModalElement = null, // Help/Troubleshooting modal element
// Widget Elements
digitalClockWidgetElement = null, // The draggable clock widget itself
widgetDigitalDateDisplayElement = null, // Date display inside clock widget
widgetDigitalTimeDisplayElement = null, // Time display inside clock widget
batteryWidgetElement = null, batteryLevelElement = null, // The visual level indicator
batteryPercentageValueElement = null, // Text showing percentage
batteryChargingStatusElement = null, // "Charging" text/icon
batteryLowStatusElement = null, // "Low Battery" text/icon
todoWidgetElement = null, todoListElement = null, // The <ul> element
newTodoInputElement = null, // Input field for new tasks
addTodoButtonElement = null, // Button to add tasks
todoResizeHandleElement = null, // Resizing handle for To-Do widget
pomodoroWidgetElement = null, pomodoroModeButtons = null, // Pomodoro, Short Break, Long Break buttons
pomodoroTimeDisplayElement = null, // Text showing remaining time
startPomodoroButtonElement = null, pausePomodoroButtonElement = null, resetPomodoroButtonElement = null, 
// Other Elements
infoDisclaimerElement = null; // Disclaimer text at the bottom
// --- State Variables ---
// Holds the instance of the NoSleep library.
var nosleep = new NoSleep();
// Stores the user's name after they enter it.
var userName = null;
// Holds the interval ID for the main clock update function.
var clockInterval = null;
// Flag to determine if the clock should use 12-hour (true) or 24-hour (false) format.
var is12HourFormat = false;
// Flags to control the visibility of each widget.
var clockWidgetVisible = true;
var pomodoroVisible = true;
var batteryVisible = true;
var todoVisible = true;
// Flag to hide all widgets for a minimal interface.
var minimalModeActive = false;
// Holds the event object for deferred PWA installation prompt.
var deferredInstallPrompt = null;
// State variables for dragging each widget.
var isDraggingClock = false;
var clockOffsetX = 0; // Horizontal offset from mouse pointer to widget corner
var clockOffsetY = 0; // Vertical offset from mouse pointer to widget corner
var isDraggingBattery = false;
var batteryOffsetX = 0;
var batteryOffsetY = 0;
var isDraggingTodo = false;
var todoOffsetX = 0;
var todoOffsetY = 0;
var isDraggingPomodoro = false;
var pomodoroOffsetX = 0;
var pomodoroOffsetY = 0;
// State variables for resizing the To-Do widget.
var isResizingTodo = false;
var initialTodoWidth = 0; // Width when resize starts
var initialTodoHeight = 0; // Height when resize starts
var initialMouseX = 0; // Mouse X position when resize starts
var initialMouseY = 0; // Mouse Y position when resize starts
// Stores the height of the navbar, used for clamping widget positions.
var navbarHeight = 0;
// Array to hold the To-Do list items.
var todos = [];
// State variables for the Pomodoro timer.
var pomodoroMode = "pomodoro"; // Current mode
var pomodoroTotalDuration = 25 * 60; // Total duration for the current mode (in seconds)
var pomodoroRemainingTime = pomodoroTotalDuration; // Time remaining (in seconds)
var pomodoroInterval = null; // Interval ID for the timer countdown
var isPomodoroRunning = false; // Whether the timer is currently running
// --- Constants ---
// Defines keys used for storing data in localStorage.
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
// Current page URL, used for sharing.
var SITE_URL = window.location.href;
// Default document title, used for Pomodoro display.
var SITE_TITLE = document.title;
// Minimum dimensions for resizable widgets (like To-Do).
var MIN_WIDGET_WIDTH = 250;
var MIN_WIDGET_HEIGHT = 180;
// Padding around the edges of the screen to prevent widgets from being dragged off-screen.
var WIDGET_POSITION_PADDING = 10;
// Default durations for Pomodoro timer modes (in seconds).
var POMODORO_DURATION = 25 * 60; // 25 minutes
var SHORT_BREAK_DURATION = 5 * 60; // 5 minutes
var LONG_BREAK_DURATION = 15 * 60; // 15 minutes
// --- Utility: Safe Element Access ---
/**
 * Checks if all provided DOM elements were successfully found.
 * @param elements - An object where keys are descriptive names and values are the queried elements or NodeLists.
 * @returns True if all elements are found, false otherwise (logs an error).
 */
function ensureElements(elements) {
    for (var key in elements) {
        var el = elements[key];
        // Check if the element is null or if it's an empty NodeList.
        if (!el || (el instanceof NodeList && el.length === 0)) {
            console.error("Initialization failed: Element(s) for '".concat(key, "' not found."));
            return false; // Stop checking and return false if any element is missing.
        }
    }
    return true; // All elements were found.
}
// --- Error Handling ---
/**
 * Handles errors originating from the NoSleep.js library.
 * Logs the error and resets the UI state related to keeping the screen awake.
 * @param err - The error object caught.
 */
function handleNoSleepError(err) {
    var message = "NoSleep Error";
    if (err instanceof Error) {
        message += ": ".concat(err.name, ", ").concat(err.message);
    }
    else {
        message += ": Unknown error occurred.";
    }
    console.error(message, err);
    // Reset the UI if an error occurs enabling NoSleep.
    if (keepAwakeSwitch) {
        keepAwakeSwitch.checked = false; // Uncheck the switch.
        changeBackground(false); // Set background to 'disabled' state.
        changeStatusText(false); // Set status text to 'Almost sleepy'.
        changeFavicon(false); // Set favicon to 'disabled' state icon.
    }
}
// --- UI Toggling & Core Logic ---
/**
 * Event handler for the main 'Keep Awake' switch.
 * Enables or disables the NoSleep functionality and updates the UI accordingly.
 * @param event - The change event from the switch input.
 */
function changeSwitch(event) {
    var target = event.target;
    // Ensure the target is the switch and has a 'checked' property.
    if ((target === null || target === void 0 ? void 0 : target.checked) !== undefined) {
        var isChecked_1 = target.checked;
        // Asynchronously enable or disable NoSleep.
        var action = isChecked_1
            ? nosleep.enable() // Returns a Promise
            : Promise.resolve(nosleep.disable()); // Wraps disable() in a resolved Promise for consistent handling.
        action
            .then(function () {
            // Update UI elements based on the new state.
            changeBackground(isChecked_1);
            changeStatusText(isChecked_1);
            changeFavicon(isChecked_1);
            updatePomodoroModeButtonsUI(); // Update Pomodoro button styles based on awake state.
        })
            .catch(function (err) {
            // Handle potential errors during enable/disable.
            handleNoSleepError(err);
            // Ensure the switch reflects the failed state if enabling failed.
            if (keepAwakeSwitch) {
                keepAwakeSwitch.checked = false;
            }
        });
    }
}
/**
 * Changes the background color and highlight colors based on the awake state.
 * Applies appropriate CSS classes to various elements.
 * @param isAwake - True if the screen should be kept awake, false otherwise.
 */
function changeBackground(isAwake) {
    // --- Gather elements that need dynamic highlight color changes ---
    // Base elements that use the primary/secondary highlight text color.
    var baseHighlightTargets = [];
    if (navbar)
        baseHighlightTargets.push(navbar.querySelector(".navbar-brand span")); // Span in "Stay Awake"
    if (userGreetingElement)
        baseHighlightTargets.push(userGreetingElement.querySelector(".user-name")); // User's name
    // Find the specific span within the disclaimer for highlighting.
    var disclaimerHighlightSpan = infoDisclaimerElement === null || infoDisclaimerElement === void 0 ? void 0 : infoDisclaimerElement.querySelector("span");
    if (disclaimerHighlightSpan instanceof HTMLElement)
        baseHighlightTargets.push(disclaimerHighlightSpan); // "foreground" text
    // Ensure we only have unique, non-null elements.
    var uniqueTextHighlights = Array.from(new Set(baseHighlightTargets.filter(function (el) { return el !== null; })));
    // Icons within widget headers.
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
    // Buttons that use the primary/secondary background color.
    var generalButtons = [
        addTodoButtonElement, // "+" button in To-Do
        startPomodoroButtonElement, // "Start" button in Pomodoro
    ];
    // The main status text ("Awake" / "Almost sleepy").
    var statusElement = [statusText];
    // --- Determine which classes to add and remove ---
    // Set background class on the root HTML element.
    var classToAdd = isAwake ? "background-enabled" : "background-disabled";
    var classToRemove = isAwake ? "background-disabled" : "background-enabled";
    document.documentElement.classList.add(classToAdd);
    document.documentElement.classList.remove(classToRemove);
    // Define class mappings for adding/removing based on the awake state.
    var highlightClassMap = isAwake
        ? {
            // State: Awake (Green theme)
            toAdd: {
                "highlight-text": __spreadArray(__spreadArray([], uniqueTextHighlights, true), statusElement, true), // Green text
                "icon-highlight-primary": icons, // Green icons
                "button-bg-primary": generalButtons, // Green buttons
            },
            toRemove: {
                "secondary-highlight-text": __spreadArray(__spreadArray([], uniqueTextHighlights, true), statusElement, true),
                "icon-highlight-secondary": icons, // Remove blue icons
                "button-bg-secondary": generalButtons, // Remove blue buttons
            },
        }
        : {
            // State: Almost Sleepy (Blue theme)
            toAdd: {
                "secondary-highlight-text": __spreadArray(__spreadArray([], uniqueTextHighlights, true), statusElement, true),
                "icon-highlight-secondary": icons, // Blue icons
                "button-bg-secondary": generalButtons, // Blue buttons
            },
            toRemove: {
                "highlight-text": __spreadArray(__spreadArray([], uniqueTextHighlights, true), statusElement, true), // Remove green text
                "icon-highlight-primary": icons, // Remove green icons
                "button-bg-primary": generalButtons, // Remove green buttons
            },
        };
    // Apply the class changes using the helper function.
    addRemoveClassesOfMultipleElements(highlightClassMap);
    // Ensure Pomodoro mode buttons also reflect the current theme.
    updatePomodoroModeButtonsUI();
}
/**
 * Updates the main status text in the hero section.
 * @param isAwake - True to display "Awake", false for "Almost sleepy".
 */
function changeStatusText(isAwake) {
    if (statusText) {
        statusText.innerText = isAwake ? "Awake" : "Almost sleepy";
        // Toggle the appropriate highlight class based on the state.
        statusText.classList.toggle("highlight-text", isAwake); // Green if awake
        statusText.classList.toggle("secondary-highlight-text", !isAwake); // Blue if not awake
    }
}
/**
 * Changes the website's favicon based on the awake state.
 * @param isAwake - True for the green favicon, false for the blue one.
 */
function changeFavicon(isAwake) {
    if (favicon) {
        favicon.href = isAwake
            ? "./favicon/favicon_green.ico"
            : "./favicon/favicon_blue.ico";
    }
}
/**
 * Determines the appropriate greeting prefix based on the current hour.
 * @returns "Good Morning", "Good Afternoon", or "Good Evening".
 */
function getGreetingPrefix() {
    var h = new Date().getHours(); // Get current hour (0-23)
    return h >= 5 && h < 12
        ? "Good Morning"
        : h >= 12 && h < 18
            ? "Good Afternoon"
            : "Good Evening";
}
/**
 * Updates the greeting message displayed in the hero section.
 * Includes the user's name if available.
 */
function updateGreeting() {
    if (userGreetingElement && userName) {
        // If user name exists, personalize the greeting.
        userGreetingElement.innerHTML = "".concat(getGreetingPrefix(), ", <span class=\"user-name\">").concat(userName, "</span>!");
        // Re-apply background/highlight colors, ensuring the name gets the correct style.
        if (keepAwakeSwitch)
            changeBackground(keepAwakeSwitch.checked);
    }
    else if (userGreetingElement) {
        // If no user name, display a generic greeting.
        userGreetingElement.innerHTML = getGreetingPrefix() + "!";
    }
}
/**
 * Formats the time part of a Date object.
 * @param d - The Date object.
 * @param h12 - True for 12-hour format (AM/PM), false for 24-hour format.
 * @returns Formatted time string (e.g., "02:30:15 PM" or "14:30:15").
 */
function formatTimePart(d, h12) {
    return d.toLocaleTimeString(h12 ? "en-US" : "en-GB", {
        // Use appropriate locale for format
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: h12,
    });
}
/**
 * Formats the date part of a Date object.
 * @param d - The Date object.
 * @returns Formatted date string (e.g., "Wednesday, March 20, 2024").
 */
function formatDatePart(d) {
    return d.toLocaleDateString("en-US", {
        // Using en-US for a common format
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    });
}
/**
 * Updates the digital clock display(s) every second.
 * Updates both the main hero clock and the clock widget.
 * Also triggers a greeting update at the top of the hour.
 */
function updateClock() {
    var now = new Date();
    var formattedTime = formatTimePart(now, is12HourFormat);
    var formattedDate = formatDatePart(now);
    // Update the main hero clock (Date + Time).
    var fullDateTimeString = "".concat(formattedDate, ", ").concat(formattedTime);
    if (digitalClockElement) {
        digitalClockElement.innerText = fullDateTimeString;
    }
    // Update the draggable clock widget (separate Date and Time lines).
    if (widgetDigitalDateDisplayElement) {
        widgetDigitalDateDisplayElement.innerText = formattedDate;
    }
    if (widgetDigitalTimeDisplayElement) {
        widgetDigitalTimeDisplayElement.innerText = formattedTime;
    }
    // Check if it's the start of a new hour to update the greeting.
    if (now.getMinutes() === 0 && now.getSeconds() === 0) {
        updateGreeting();
    }
}
/**
 * Event handler for the 12/24-hour format toggle switch in settings.
 * Updates the state, saves the preference to localStorage, and refreshes the clock display.
 * @param e - The change event from the switch input.
 */
function handleClockFormatToggle(e) {
    var t = e.target;
    if (t) {
        is12HourFormat = t.checked; // Update the state variable.
        // Save the preference.
        localStorage.setItem(LSK.clockFormat, is12HourFormat ? "12h" : "24h");
        updateClock(); // Immediately update the clock display.
    }
}
// --- Widget Visibility ---
/**
 * Applies the current visibility settings to all widgets.
 * Considers both individual widget toggles and the "Minimal Mode" switch.
 * Also disables individual toggles when Minimal Mode is active.
 */
function applyAllWidgetVisibilities() {
    var hideAllWidgets = minimalModeActive; // Check if minimal mode is on.
    // Determine visibility for each widget based on its own toggle AND minimal mode.
    var shouldShowClock = !hideAllWidgets && clockWidgetVisible;
    var shouldShowPomodoro = !hideAllWidgets && pomodoroVisible;
    var shouldShowBattery = !hideAllWidgets && batteryVisible;
    var shouldShowTodo = !hideAllWidgets && todoVisible;
    // Toggle the 'widget-hidden' class based on calculated visibility.
    digitalClockWidgetElement === null || digitalClockWidgetElement === void 0 ? void 0 : digitalClockWidgetElement.classList.toggle("widget-hidden", !shouldShowClock);
    pomodoroWidgetElement === null || pomodoroWidgetElement === void 0 ? void 0 : pomodoroWidgetElement.classList.toggle("widget-hidden", !shouldShowPomodoro);
    batteryWidgetElement === null || batteryWidgetElement === void 0 ? void 0 : batteryWidgetElement.classList.toggle("widget-hidden", !shouldShowBattery);
    todoWidgetElement === null || todoWidgetElement === void 0 ? void 0 : todoWidgetElement.classList.toggle("widget-hidden", !shouldShowTodo);
    // Disable individual widget toggle switches if minimal mode is active.
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
            // Add opacity to visually indicate they are disabled.
            (_a = widgetSwitch
                .closest(".form-check")) === null || _a === void 0 ? void 0 : _a.classList.toggle("opacity-50", disableIndividualToggles);
        }
    });
    // Special handling for Pomodoro: ensure display/title updates if visible.
    if (shouldShowPomodoro) {
        updatePomodoroDisplay(); // Refresh display if it becomes visible.
    }
    else {
        // If Pomodoro is hidden, reset the document title if it was showing timer info.
        if (document.title.includes("Focus") || document.title.includes("Break")) {
            document.title = SITE_TITLE;
        }
    }
}
/**
 * Event handler for the "Show Clock" toggle switch.
 * Updates state, saves preference, and applies visibility changes.
 * @param event - The change event.
 */
function handleShowClockToggle(event) {
    var target = event.target;
    if (target) {
        clockWidgetVisible = target.checked;
        localStorage.setItem(LSK.clockWidgetVisible, clockWidgetVisible ? "true" : "false");
        applyAllWidgetVisibilities(); // Re-evaluate and apply visibility to all widgets.
    }
}
/**
 * Event handler for the "Show Pomodoro" toggle switch.
 * Updates state, saves preference, and applies visibility changes.
 * @param event - The change event.
 */
function handleShowPomodoroToggle(event) {
    var target = event.target;
    if (target) {
        pomodoroVisible = target.checked;
        localStorage.setItem(LSK.pomodoroVisible, pomodoroVisible ? "true" : "false");
        applyAllWidgetVisibilities();
    }
}
/**
 * Event handler for the "Show Battery" toggle switch.
 * Updates state, saves preference, and applies visibility changes.
 * @param event - The change event.
 */
function handleShowBatteryToggle(event) {
    var target = event.target;
    if (target) {
        batteryVisible = target.checked;
        localStorage.setItem(LSK.batteryVisible, batteryVisible ? "true" : "false");
        applyAllWidgetVisibilities();
    }
}
/**
 * Event handler for the "Show To-Do List" toggle switch.
 * Updates state, saves preference, and applies visibility changes.
 * @param event - The change event.
 */
function handleShowTodoToggle(event) {
    var target = event.target;
    if (target) {
        todoVisible = target.checked;
        localStorage.setItem(LSK.todoVisible, todoVisible ? "true" : "false");
        applyAllWidgetVisibilities();
    }
}
/**
 * Event handler for the "Minimal Mode" toggle switch.
 * Updates state, saves preference, and applies visibility changes.
 * @param event - The change event.
 */
function handleMinimalModeToggle(event) {
    var target = event.target;
    if (target) {
        minimalModeActive = target.checked;
        localStorage.setItem(LSK.minimalModeActive, minimalModeActive ? "true" : "false");
        applyAllWidgetVisibilities(); // Re-evaluate all widget visibilities.
    }
}
// --- Name Prompt ---
/**
 * Handles the submission of the user's name from the prompt modal.
 * Validates input, saves to localStorage, updates greeting, and hides the modal.
 */
function handleNameSubmit() {
    var n = userNameInputElement === null || userNameInputElement === void 0 ? void 0 : userNameInputElement.value.trim(); // Get trimmed input value.
    // Check if name is entered and elements exist.
    if (n && userNameInputElement && nameInputErrorElement) {
        userName = n; // Update state variable.
        localStorage.setItem(LSK.userName, n); // Save to localStorage.
        updateGreeting(); // Update the greeting display.
        // Reset error state and hide modal.
        nameInputErrorElement.classList.add("d-none");
        userNameInputElement.classList.remove("is-invalid");
        namePromptModalInstance === null || namePromptModalInstance === void 0 ? void 0 : namePromptModalInstance.hide();
    }
    else if (userNameInputElement && nameInputErrorElement) {
        // Show error message if name is empty.
        nameInputErrorElement.classList.remove("d-none");
        userNameInputElement.classList.add("is-invalid");
        userNameInputElement.focus(); // Set focus back to the input field.
    }
}
/**
 * Initializes and shows the name prompt modal if the user's name is not already stored.
 */
function promptForName() {
    // Get modal-related elements.
    namePromptModalElement = document.getElementById("namePromptModal");
    userNameInputElement = document.getElementById("userNameInput");
    submitNameButtonElement = document.getElementById("submitNameButton");
    nameInputErrorElement = document.getElementById("nameInputError");
    // Ensure all necessary elements for the modal are present.
    if (ensureElements({
        namePromptModalElement: namePromptModalElement,
        userNameInputElement: userNameInputElement,
        submitNameButtonElement: submitNameButtonElement,
        nameInputErrorElement: nameInputErrorElement,
    })) {
        // Get or create a Bootstrap modal instance.
        namePromptModalInstance = bootstrap.Modal.getOrCreateInstance(namePromptModalElement);
        // Add event listeners (remove first to prevent duplicates if called again).
        submitNameButtonElement.removeEventListener("click", handleNameSubmit);
        submitNameButtonElement.addEventListener("click", handleNameSubmit);
        userNameInputElement.removeEventListener("keypress", handleEnterKey); // For Enter key submission
        userNameInputElement.addEventListener("keypress", handleEnterKey);
        // Set focus to the input field when the modal is shown.
        namePromptModalElement.addEventListener("shown.bs.modal", function () { return userNameInputElement === null || userNameInputElement === void 0 ? void 0 : userNameInputElement.focus(); }, { once: true } // Ensure this listener runs only once per show.
        );
        // Show the modal.
        namePromptModalInstance === null || namePromptModalInstance === void 0 ? void 0 : namePromptModalInstance.show();
    }
    else {
        // Log error if modal elements are missing and proceed without a name.
        console.error("Cannot initialize name prompt: Modal elements missing.");
        updateGreeting(); // Update greeting without a name.
    }
}
/**
 * Handles the Enter key press within the name input field to submit the name.
 * @param e - The KeyboardEvent object.
 */
function handleEnterKey(e) {
    // Check if Enter was pressed and the input field has focus.
    if (e.key === "Enter" && userNameInputElement === document.activeElement) {
        e.preventDefault(); // Prevent default form submission behavior.
        handleNameSubmit(); // Trigger the name submission logic.
    }
}
// --- Battery Functions ---
/**
 * Updates the battery widget's UI based on the provided battery manager state.
 * @param battery - The BatteryManager object containing current battery info.
 */
function updateBatteryUI(battery) {
    // Ensure required elements are present.
    if (!batteryLevelElement ||
        !batteryPercentageValueElement ||
        !batteryChargingStatusElement ||
        !batteryLowStatusElement)
        return;
    var level = battery.level; // Battery level (0.0 to 1.0)
    var percentage = Math.round(level * 100); // Convert to percentage
    var isCharging = battery.charging; // Is the device charging?
    var isLow = !isCharging && level <= 0.2; // Is battery low (and not charging)?
    // Update percentage text.
    batteryPercentageValueElement.innerText = percentage.toString();
    // Update visual battery level height.
    batteryLevelElement.style.height = "".concat(percentage, "%");
    // Update visual battery level color based on percentage.
    batteryLevelElement.classList.remove("level-low", "level-medium", "level-high");
    if (level <= 0.2)
        batteryLevelElement.classList.add("level-low"); // Red
    else if (level <= 0.5)
        batteryLevelElement.classList.add("level-medium"); // Orange
    else
        batteryLevelElement.classList.add("level-high"); // Green
    // Show/hide charging status indicator.
    batteryChargingStatusElement.style.display = isCharging ? "block" : "none";
    // Show/hide low battery warning (only if not charging).
    batteryLowStatusElement.style.display = isLow ? "block" : "none";
}
/**
 * Initializes the battery status indicator widget.
 * Checks for API support, fetches battery status, sets up event listeners,
 * and handles cases where the API is not supported or fails.
 */
function initializeBatteryIndicator() {
    var _a;
    // Check if the Battery Status API is supported by the browser.
    if ("getBattery" in navigator && typeof navigator.getBattery === "function") {
        navigator
            .getBattery() // Returns a Promise that resolves with the BatteryManager.
            .then(function (batteryManager) {
            // Get battery widget elements.
            batteryWidgetElement = document.getElementById("battery-widget");
            batteryLevelElement = document.getElementById("battery-level");
            batteryPercentageValueElement = document.getElementById("battery-percentage-value");
            batteryChargingStatusElement = document.getElementById("battery-charging-status");
            batteryLowStatusElement = document.getElementById("battery-low-status");
            // Ensure all necessary elements for the widget exist.
            if (ensureElements({
                batteryWidgetElement: batteryWidgetElement,
                batteryLevelElement: batteryLevelElement,
                batteryPercentageValueElement: batteryPercentageValueElement,
                batteryChargingStatusElement: batteryChargingStatusElement,
                batteryLowStatusElement: batteryLowStatusElement,
            })) {
                // Initial UI update.
                updateBatteryUI(batteryManager);
                // Add event listeners to update UI when battery status changes.
                batteryManager.addEventListener("levelchange", function () {
                    return updateBatteryUI(batteryManager);
                });
                batteryManager.addEventListener("chargingchange", function () {
                    return updateBatteryUI(batteryManager);
                });
                // Add pointer down listener to the header for dragging.
                var header = batteryWidgetElement.querySelector(".widget-header");
                if (header)
                    header.addEventListener("pointerdown", handleBatteryPointerDown);
                else
                    console.error("Battery widget header not found!");
            }
            else {
                // Log error and hide widget if elements are missing.
                console.error("Battery widget init failed: elements missing.");
                if (batteryWidgetElement)
                    batteryWidgetElement.classList.add("widget-hidden");
            }
        })
            .catch(function (error) {
            var _a;
            // Handle errors during API access (e.g., permission denied).
            var message = "Battery API error";
            if (error instanceof Error)
                message += ": ".concat(error.message);
            console.error(message, error);
            // Hide the widget and disable its toggle in settings.
            var widget = document.getElementById("battery-widget");
            if (widget)
                widget.classList.add("widget-hidden");
            if (showBatteryWidgetSwitch) {
                showBatteryWidgetSwitch.checked = false;
                showBatteryWidgetSwitch.disabled = true;
                (_a = showBatteryWidgetSwitch
                    .closest(".form-check")) === null || _a === void 0 ? void 0 : _a.classList.add("opacity-50");
                batteryVisible = false; // Update state.
                localStorage.setItem(LSK.batteryVisible, "false"); // Persist state.
                applyAllWidgetVisibilities(); // Update UI.
            }
        });
    }
    else {
        // Handle case where the Battery API is not supported.
        console.warn("Battery API not supported.");
        var widget = document.getElementById("battery-widget");
        // Hide the widget and disable its toggle.
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
/**
 * Loads the To-Do list items from localStorage.
 * Handles potential parsing errors and validates data structure.
 */
function loadTodos() {
    var s = localStorage.getItem(LSK.todos); // Get raw string data.
    try {
        if (s) {
            var p = JSON.parse(s); // Attempt to parse JSON.
            // Validate if the parsed data is an array of valid TodoItem objects.
            if (Array.isArray(p) &&
                p.every(function (i) {
                    return typeof i === "object" &&
                        i !== null &&
                        typeof i.id === "number" &&
                        typeof i.text === "string" &&
                        typeof i.completed === "boolean";
                })) {
                todos = p; // Assign validated data to the state array.
            }
            else {
                // If data is invalid, reset to an empty array and clear localStorage.
                console.warn("Invalid To-Do data found in localStorage. Resetting.");
                todos = [];
                localStorage.removeItem(LSK.todos);
            }
        }
        else {
            // If no data found, initialize with an empty array.
            todos = [];
        }
    }
    catch (e) {
        // Handle JSON parsing errors.
        console.error("Error parsing todos from localStorage:", e);
        todos = []; // Reset state.
        localStorage.removeItem(LSK.todos); // Clear potentially corrupt data.
    }
}
/**
 * Saves the current To-Do list array to localStorage.
 */
function saveTodos() {
    try {
        localStorage.setItem(LSK.todos, JSON.stringify(todos));
    }
    catch (e) {
        console.error("Error saving todos to localStorage:", e);
        // Could potentially implement more robust error handling here (e.g., retry, notify user).
    }
}
/**
 * Renders the To-Do list items in the widget's UI.
 * Clears the existing list and rebuilds it based on the `todos` array.
 */
function renderTodos() {
    // Ensure the list element exists.
    if (!todoListElement) {
        console.error("Cannot render todos: todoListElement not found.");
        return;
    }
    // Clear the current list content.
    todoListElement.innerHTML = "";
    // Display a message if the list is empty.
    if (todos.length === 0) {
        var li = document.createElement("li");
        li.textContent = "No tasks yet!";
        li.style.textAlign = "center";
        li.style.color = "var(--text-dim)";
        li.style.padding = "10px 0";
        todoListElement.appendChild(li);
        return;
    }
    // Create and append list items for each todo.
    todos.forEach(function (todo) {
        var li = document.createElement("li");
        li.className = "todo-item";
        li.dataset.id = String(todo.id); // Store ID for later reference.
        if (todo.completed) {
            li.classList.add("completed"); // Add class for styling completed tasks.
        }
        // Create checkbox for marking tasks complete/incomplete.
        var cb = document.createElement("input");
        cb.type = "checkbox";
        cb.checked = todo.completed;
        cb.addEventListener("change", function () { return toggleTodo(todo.id); }); // Add event listener.
        cb.setAttribute("aria-label", // Accessibility label.
        "Mark task \"".concat(todo.text, "\" as ").concat(todo.completed ? "incomplete" : "complete"));
        // Create span to display the task text.
        var span = document.createElement("span");
        span.textContent = todo.text;
        // Create delete button.
        var btn = document.createElement("button");
        btn.className = "delete-todo-btn";
        btn.innerHTML = '<i class="fas fa-trash-alt" aria-hidden="true"></i>'; // Font Awesome trash icon.
        btn.title = "Delete task \"".concat(todo.text, "\""); // Tooltip.
        btn.setAttribute("aria-label", "Delete task \"".concat(todo.text, "\"")); // Accessibility label.
        btn.addEventListener("click", function () { return deleteTodo(todo.id); }); // Add event listener.
        // Append elements to the list item.
        li.append(cb, span, btn);
        // Append the list item to the main list element.
        todoListElement.appendChild(li);
    });
}
/**
 * Adds a new To-Do item to the list based on the input field's value.
 */
function addTodo() {
    var t = newTodoInputElement === null || newTodoInputElement === void 0 ? void 0 : newTodoInputElement.value.trim(); // Get trimmed text from input.
    if (t && newTodoInputElement) {
        // Add new todo object to the array.
        todos.push({ id: Date.now(), text: t, completed: false });
        saveTodos(); // Persist changes.
        renderTodos(); // Update the UI.
        newTodoInputElement.value = ""; // Clear the input field.
        newTodoInputElement.focus(); // Set focus back to the input field for easy adding.
    }
    else if (newTodoInputElement) {
        // If input is empty, just focus the input field.
        newTodoInputElement.focus();
    }
}
/**
 * Toggles the completion status of a To-Do item.
 * @param id - The ID of the To-Do item to toggle.
 */
function toggleTodo(id) {
    // Find the todo and update its 'completed' status.
    todos = todos.map(function (t) {
        return t.id === id ? __assign(__assign({}, t), { completed: !t.completed }) : t;
    });
    saveTodos(); // Persist changes.
    renderTodos(); // Update the UI.
}
/**
 * Deletes a To-Do item from the list.
 * @param id - The ID of the To-Do item to delete.
 */
function deleteTodo(id) {
    // Filter out the todo with the matching ID.
    todos = todos.filter(function (t) { return t.id !== id; });
    saveTodos(); // Persist changes.
    renderTodos(); // Update the UI.
}
/**
 * Initializes the To-Do list widget.
 * Fetches elements, loads data, sets up event listeners for adding,
 * dragging, and resizing.
 */
function initializeTodoList() {
    // Get To-Do widget elements.
    todoWidgetElement = document.getElementById("todo-widget");
    todoListElement = document.getElementById("todo-list");
    newTodoInputElement = document.getElementById("new-todo-input");
    addTodoButtonElement = document.getElementById("add-todo-button");
    if (todoWidgetElement) {
        // Find the resize handle within the widget.
        todoResizeHandleElement = todoWidgetElement.querySelector(".widget-resize-handle");
        // Ensure all necessary elements exist.
        if (ensureElements({
            todoWidgetElement: todoWidgetElement,
            todoListElement: todoListElement,
            newTodoInputElement: newTodoInputElement,
            addTodoButtonElement: addTodoButtonElement,
            todoResizeHandleElement: todoResizeHandleElement,
        })) {
            loadTodos(); // Load saved tasks.
            renderTodos(); // Display tasks.
            // Add event listener for the "Add Task" button.
            addTodoButtonElement.addEventListener("click", addTodo);
            // Add event listener for pressing Enter in the input field.
            newTodoInputElement.addEventListener("keypress", function (event) {
                if (event.key === "Enter") {
                    event.preventDefault(); // Prevent default form submission.
                    addTodo();
                }
            });
            // Add listener for dragging the widget header.
            var header = todoWidgetElement.querySelector(".widget-header");
            if (header)
                header.addEventListener("pointerdown", handleTodoPointerDown);
            else
                console.error("To-Do widget header not found!");
            // Add listener for resizing the widget.
            todoResizeHandleElement.addEventListener("pointerdown", handleTodoResizePointerDown);
        }
        else {
            // Log error and hide widget if elements are missing.
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
/**
 * Formats remaining seconds into MM:SS format.
 * @param s - Time in seconds.
 * @returns Formatted string "MM:SS".
 */
function formatPomodoroTime(s) {
    var m = Math.floor(s / 60); // Calculate minutes.
    var c = s % 60; // Calculate remaining seconds.
    // Pad with leading zeros if necessary.
    return "".concat(String(m).padStart(2, "0"), ":").concat(String(c).padStart(2, "0"));
}
/**
 * Updates the Pomodoro timer display in the widget and the browser tab title.
 */
function updatePomodoroDisplay() {
    if (pomodoroTimeDisplayElement) {
        // Update the time display inside the widget.
        pomodoroTimeDisplayElement.innerText = formatPomodoroTime(pomodoroRemainingTime);
        // Check if the widget is currently visible.
        var isPomodoroWidgetVisible = !(pomodoroWidgetElement === null || pomodoroWidgetElement === void 0 ? void 0 : pomodoroWidgetElement.classList.contains("widget-hidden"));
        // Update the document title if the timer is running and the widget is visible.
        if (isPomodoroRunning && isPomodoroWidgetVisible) {
            var modeText = pomodoroMode === "pomodoro" ? "Focus" : "Break"; // "Focus" or "Break"
            document.title = "".concat(formatPomodoroTime(pomodoroRemainingTime), " - ").concat(modeText, " | ").concat(SITE_TITLE);
        }
        else {
            // Reset the title if the timer isn't running or the widget is hidden.
            if (document.title !== SITE_TITLE) {
                document.title = SITE_TITLE;
            }
        }
    }
}
/**
 * Updates the visibility of the Pomodoro control buttons (Start, Pause, Reset).
 */
function updatePomodoroControls() {
    if (!startPomodoroButtonElement ||
        !pausePomodoroButtonElement ||
        !resetPomodoroButtonElement)
        return; // Exit if buttons aren't found.
    // Determine which buttons should be shown based on the timer state.
    var ss = !isPomodoroRunning; // Show Start if not running.
    var sp = isPomodoroRunning; // Show Pause if running.
    // Show Reset if paused OR if stopped but not at the full duration (i.e., can be reset).
    var sr = sp || (!isPomodoroRunning && pomodoroRemainingTime < pomodoroTotalDuration);
    // Toggle button visibility using inline display style.
    startPomodoroButtonElement.style.display = ss ? "inline-block" : "none";
    pausePomodoroButtonElement.style.display = sp ? "inline-block" : "none";
    resetPomodoroButtonElement.style.display = sr ? "inline-block" : "none";
}
/**
 * Saves the current state of the Pomodoro timer to localStorage.
 * Includes mode, remaining time, running status, and last tick timestamp.
 */
function savePomodoroState() {
    // Construct the state object.
    var s = {
        mode: pomodoroMode,
        remainingTime: pomodoroRemainingTime,
        isRunning: isPomodoroRunning,
        // Store timestamp only if running, to calculate elapsed time later.
        lastTickTimestamp: isPomodoroRunning ? Date.now() : undefined,
    };
    try {
        localStorage.setItem(LSK.pomodoroState, JSON.stringify(s));
    }
    catch (e) {
        console.error("Error saving Pomodoro state:", e);
    }
}
/**
 * Loads the Pomodoro timer state from localStorage.
 * Validates the loaded data and calculates elapsed time if the timer was running
 * when the page was closed/reloaded.
 */
function loadPomodoroState() {
    var j = localStorage.getItem(LSK.pomodoroState); // Get raw JSON string.
    var l = false; // Flag to track if loading was successful.
    if (j) {
        try {
            var s = JSON.parse(j); // Parse JSON.
            // Validate the structure and types of the loaded state.
            if (s &&
                typeof s === "object" &&
                ["pomodoro", "shortBreak", "longBreak"].includes(s.mode) && // Valid mode?
                typeof s.remainingTime === "number" && // Valid time?
                typeof s.isRunning === "boolean" && // Valid running state?
                // Valid timestamp (either undefined or a number)?
                (s.lastTickTimestamp === undefined ||
                    typeof s.lastTickTimestamp === "number")) {
                // Restore state variables from loaded data.
                pomodoroMode = s.mode;
                pomodoroRemainingTime = s.remainingTime;
                isPomodoroRunning = s.isRunning;
                // If the timer was running when saved, calculate elapsed time.
                if (isPomodoroRunning && s.lastTickTimestamp) {
                    var n = Date.now(); // Current time.
                    var e = Math.floor((n - s.lastTickTimestamp) / 1000); // Elapsed seconds.
                    pomodoroRemainingTime = Math.max(0, pomodoroRemainingTime - e); // Subtract elapsed time.
                    // If the timer finished while the page was inactive.
                    if (pomodoroRemainingTime === 0) {
                        isPomodoroRunning = false; // Mark as not running.
                        console.log("Pomodoro (".concat(pomodoroMode, ") finished while inactive."));
                        // Reset timer to full duration for the mode it was in.
                        pomodoroTotalDuration = getDurationForMode(pomodoroMode);
                        pomodoroRemainingTime = pomodoroTotalDuration;
                    }
                }
                else if (!isPomodoroRunning && pomodoroRemainingTime <= 0) {
                    // If timer was saved in a finished state (time <= 0), reset it.
                    pomodoroTotalDuration = getDurationForMode(pomodoroMode);
                    pomodoroRemainingTime = pomodoroTotalDuration;
                }
                // Ensure total duration is correct for the loaded mode.
                pomodoroTotalDuration = getDurationForMode(pomodoroMode);
                // Ensure remaining time doesn't exceed the total duration (e.g., if code changed duration).
                pomodoroRemainingTime = Math.min(pomodoroRemainingTime, pomodoroTotalDuration);
                l = true; // Mark loading as successful.
            }
            else {
                // If loaded data is invalid, warn and remove it.
                console.warn("Invalid Pomodoro state found. Resetting.");
                localStorage.removeItem(LSK.pomodoroState);
            }
        }
        catch (e) {
            // Handle JSON parsing errors.
            console.error("Error parsing Pomodoro state:", e);
            localStorage.removeItem(LSK.pomodoroState); // Remove potentially corrupt data.
        }
    }
    // If loading failed or no data existed, reset to default state.
    if (!l) {
        pomodoroMode = "pomodoro";
        pomodoroTotalDuration = POMODORO_DURATION;
        pomodoroRemainingTime = POMODORO_DURATION;
        isPomodoroRunning = false;
    }
    // Update the UI based on the loaded or default state.
    updatePomodoroDisplay();
    updatePomodoroModeButtonsUI();
    updatePomodoroControls();
    // If the loaded state indicates the timer should be running, start it.
    if (isPomodoroRunning && pomodoroRemainingTime > 0) {
        startPomodoroTimer(false); // Start timer without saving state again immediately.
    }
}
/**
 * Gets the total duration in seconds for a given Pomodoro mode.
 * @param m - The Pomodoro mode.
 * @returns The duration in seconds.
 */
function getDurationForMode(m) {
    switch (m) {
        case "pomodoro":
            return POMODORO_DURATION;
        case "shortBreak":
            return SHORT_BREAK_DURATION;
        case "longBreak":
            return LONG_BREAK_DURATION;
        default:
            // Fallback for unknown modes (shouldn't happen with TypeScript).
            console.warn("Unknown Pomodoro mode: ".concat(m, ". Using default duration."));
            return POMODORO_DURATION;
    }
}
/**
 * Updates the visual styling of the Pomodoro mode buttons (Pomodoro, Short, Long).
 * Highlights the active mode and adjusts style based on the main awake/sleepy theme.
 */
function updatePomodoroModeButtonsUI() {
    var _a;
    if (!pomodoroModeButtons)
        return; // Exit if buttons not found.
    // Check the state of the main keep awake switch.
    var isAwakeActive = (_a = keepAwakeSwitch === null || keepAwakeSwitch === void 0 ? void 0 : keepAwakeSwitch.checked) !== null && _a !== void 0 ? _a : true; // Assume awake if switch not found.
    pomodoroModeButtons.forEach(function (b) {
        var isCurrentMode = b.dataset.mode === pomodoroMode; // Is this button the active mode?
        // Apply 'active' class if it's the current mode.
        b.classList.toggle("active", isCurrentMode);
        // Apply 'secondary-active' (blue theme) if it's active BUT the main app is in the 'sleepy' state.
        b.classList.toggle("secondary-active", isCurrentMode && !isAwakeActive);
    });
}
/**
 * Switches the Pomodoro timer to a new mode.
 * Pauses the current timer, updates state variables, resets time, and updates UI.
 * @param nm - The new PomodoroMode to switch to.
 */
function switchPomodoroMode(nm) {
    // If clicking the already active mode button while timer is stopped, do nothing but ensure UI is correct.
    if (pomodoroMode === nm && !isPomodoroRunning) {
        updatePomodoroModeButtonsUI();
        return;
    }
    // Pause the timer if it's running (don't save state yet, happens at end).
    pausePomodoroTimer(false);
    // Update state variables for the new mode.
    pomodoroMode = nm;
    pomodoroTotalDuration = getDurationForMode(nm); // Get duration for the new mode.
    pomodoroRemainingTime = pomodoroTotalDuration; // Reset remaining time.
    isPomodoroRunning = false; // Ensure timer is stopped.
    // Update UI elements.
    updatePomodoroDisplay();
    updatePomodoroModeButtonsUI();
    updatePomodoroControls();
    // Save the new state to localStorage.
    savePomodoroState();
}
/**
 * Starts the Pomodoro timer countdown.
 * Sets up the interval, updates state, and saves state.
 * @param sv - Whether to save the state immediately (default: true). Set to false when called during load.
 */
function startPomodoroTimer(sv) {
    if (sv === void 0) { sv = true; }
    // Prevent starting if already running or finished.
    if (isPomodoroRunning || pomodoroRemainingTime <= 0)
        return;
    isPomodoroRunning = true; // Set running flag.
    updatePomodoroControls(); // Update button visibility.
    if (sv)
        savePomodoroState(); // Save state if requested.
    // Clear any existing interval to prevent duplicates.
    if (pomodoroInterval)
        clearInterval(pomodoroInterval);
    // Define the function that runs every second (the "tick").
    var tick = function () {
        // Stop the interval if the timer is no longer marked as running.
        if (!isPomodoroRunning) {
            clearInterval(pomodoroInterval);
            pomodoroInterval = null;
            return;
        }
        pomodoroRemainingTime--; // Decrement remaining time.
        updatePomodoroDisplay(); // Update UI display.
        // Check if the timer has finished.
        if (pomodoroRemainingTime <= 0) {
            pausePomodoroTimer(false); // Stop the timer interval (don't save state here).
            console.log("Pomodoro Timer (".concat(pomodoroMode, ") finished!"));
            // Reset state for the next run (or mode switch).
            pomodoroRemainingTime = pomodoroTotalDuration;
            isPomodoroRunning = false;
            updatePomodoroDisplay(); // Update UI to show full time.
            updatePomodoroControls(); // Update buttons (show Start).
            savePomodoroState(); // Save the finished/reset state.
            // TODO: Add notification or sound indication here?
        }
        else if (pomodoroRemainingTime % 15 === 0) {
            // Periodically save state (e.g., every 15s) while running,
            // to minimize data loss if browser crashes.
            savePomodoroState();
        }
    };
    // Run the first tick immediately, then set the interval.
    tick();
    pomodoroInterval = window.setInterval(tick, 1000); // Run tick every 1000ms (1 second).
}
/**
 * Pauses the Pomodoro timer countdown.
 * Clears the interval, updates state, and optionally saves state.
 * @param sv - Whether to save the paused state (default: true).
 */
function pausePomodoroTimer(sv) {
    if (sv === void 0) { sv = true; }
    // Do nothing if not running.
    if (!isPomodoroRunning)
        return;
    // Clear the interval timer.
    if (pomodoroInterval) {
        clearInterval(pomodoroInterval);
        pomodoroInterval = null;
    }
    isPomodoroRunning = false; // Update running flag.
    updatePomodoroControls(); // Update button visibility.
    if (sv)
        savePomodoroState(); // Save the paused state if requested.
    // Reset the document title if it was showing timer info.
    if (document.title !== SITE_TITLE) {
        document.title = SITE_TITLE;
    }
}
/**
 * Resets the Pomodoro timer to the full duration for the current mode.
 * Pauses the timer, resets time, updates UI, and saves state.
 * @param sv - Whether to save the reset state (default: true).
 */
function resetPomodoroTimer(sv) {
    if (sv === void 0) { sv = true; }
    // Pause the timer first (clears interval, sets isRunning=false).
    pausePomodoroTimer(false); // Don't save intermediate paused state.
    // Reset remaining time to the total duration for the current mode.
    pomodoroRemainingTime = pomodoroTotalDuration;
    isPomodoroRunning = false; // Ensure it's marked as stopped.
    // Update UI.
    updatePomodoroDisplay();
    updatePomodoroControls();
    // Save the reset state if requested.
    if (sv)
        savePomodoroState();
}
/**
 * Initializes the Pomodoro timer widget.
 * Fetches elements, loads saved state, and sets up event listeners for mode switching and controls.
 */
function initializePomodoroTimer() {
    // Get Pomodoro widget elements.
    pomodoroWidgetElement = document.getElementById("pomodoro-widget");
    pomodoroModeButtons = document.querySelectorAll(".pomodoro-mode-btn");
    pomodoroTimeDisplayElement = document.getElementById("pomodoro-time-display");
    startPomodoroButtonElement = document.getElementById("start-pomodoro-btn");
    pausePomodoroButtonElement = document.getElementById("pause-pomodoro-btn");
    resetPomodoroButtonElement = document.getElementById("reset-pomodoro-btn");
    // Ensure all elements are present.
    if (ensureElements({
        pomodoroWidgetElement: pomodoroWidgetElement,
        pomodoroModeButtons: pomodoroModeButtons, // Checks if NodeList is not empty
        pomodoroTimeDisplayElement: pomodoroTimeDisplayElement,
        startPomodoroButtonElement: startPomodoroButtonElement,
        pausePomodoroButtonElement: pausePomodoroButtonElement,
        resetPomodoroButtonElement: resetPomodoroButtonElement,
    })) {
        loadPomodoroState(); // Load saved state and update UI.
        // Add listeners to mode buttons.
        pomodoroModeButtons.forEach(function (button) {
            button.addEventListener("click", function () {
                var mode = button.dataset.mode;
                if (mode)
                    switchPomodoroMode(mode); // Switch mode on click.
            });
        });
        // Add listeners to control buttons.
        startPomodoroButtonElement.addEventListener("click", function () {
            return startPomodoroTimer();
        });
        pausePomodoroButtonElement.addEventListener("click", function () {
            return pausePomodoroTimer();
        });
        resetPomodoroButtonElement.addEventListener("click", function () {
            return resetPomodoroTimer();
        });
        // Add listener for dragging the widget header.
        var header = pomodoroWidgetElement.querySelector(".widget-header");
        if (header)
            header.addEventListener("pointerdown", handlePomodoroPointerDown);
        else
            console.error("Pomodoro widget header not found!");
    }
    else {
        // Log error and hide widget if elements are missing.
        console.error("Pomodoro init failed: elements missing.");
        if (pomodoroWidgetElement)
            pomodoroWidgetElement.classList.add("widget-hidden");
    }
}
// --- Clock Widget Initialization ---
/**
 * Initializes the draggable digital clock widget.
 * Fetches elements and sets up the drag listener for the header.
 */
function initializeDigitalClockWidget() {
    // Get clock widget elements.
    digitalClockWidgetElement = document.getElementById("digital-clock-widget");
    widgetDigitalDateDisplayElement = document.getElementById("widget-digital-date-display");
    widgetDigitalTimeDisplayElement = document.getElementById("widget-digital-time-display");
    // Ensure elements are present.
    if (ensureElements({
        digitalClockWidgetElement: digitalClockWidgetElement,
        widgetDigitalDateDisplayElement: widgetDigitalDateDisplayElement,
        widgetDigitalTimeDisplayElement: widgetDigitalTimeDisplayElement,
    })) {
        // Add listener for dragging the widget header.
        var header = digitalClockWidgetElement.querySelector(".widget-header");
        if (header) {
            header.addEventListener("pointerdown", handleClockPointerDown);
        }
        else {
            console.error("Digital Clock widget header not found!");
        }
    }
    else {
        // Log error and hide widget if elements are missing.
        console.error("Digital Clock widget initialization failed: elements missing.");
        if (digitalClockWidgetElement)
            digitalClockWidgetElement.classList.add("widget-hidden");
    }
}
// --- Widget Position Persistence ---
/**
 * Saves the current position (top, left) of a widget to localStorage.
 * @param k - The localStorage key to use for this widget.
 * @param e - The HTMLElement of the widget.
 */
function saveWidgetPosition(k, e) {
    if (!e || !k)
        return; // Exit if element or key is missing.
    var s = window.getComputedStyle(e); // Get computed styles.
    var p = { top: s.top, left: s.left }; // Extract top and left.
    // Avoid saving 'auto' values, as they don't represent a user-set position.
    if (p.top === "auto" || p.left === "auto") {
        // This might happen if the widget was positioned with 'right' initially.
        // We only save explicit 'top' and 'left' after dragging.
        return;
    }
    try {
        localStorage.setItem(k, JSON.stringify(p)); // Save the position object as JSON.
    }
    catch (e) {
        console.error("Error saving widget position for ".concat(k, ":"), e);
    }
}
/**
 * Loads a widget's position from localStorage and applies it.
 * If no saved position exists or is invalid, applies default positions.
 * Also ensures the widget stays within screen bounds after loading.
 * @param k - The localStorage key for the widget's position.
 * @param e - The HTMLElement of the widget.
 * @param dT - Default 'top' value if no position is saved.
 * @param dL - Default 'left' value if no position is saved.
 * @param dR - Optional default 'right' value (used for battery widget initially).
 */
function loadWidgetPosition(k, e, dT, // Default Top
dL, // Default Left
dR // Default Right (optional)
) {
    var _a, _b;
    if (!e || !k)
        return; // Exit if element or key is missing.
    var p = null; // Variable to hold loaded position.
    var j = localStorage.getItem(k); // Get saved JSON string.
    // Try to parse and validate the saved position.
    if (j) {
        try {
            p = JSON.parse(j);
            // Validate structure and ensure values are not 'auto'.
            if (!p ||
                typeof p.top !== "string" ||
                typeof p.left !== "string" ||
                p.top === "auto" ||
                p.left === "auto") {
                p = null; // Invalid data, treat as no saved position.
                localStorage.removeItem(k); // Remove invalid data.
            }
        }
        catch (e) {
            // Handle JSON parsing errors.
            console.error("Error parsing widget position for ".concat(k, ":"), e);
            localStorage.removeItem(k); // Remove potentially corrupt data.
            p = null;
        }
    }
    // Apply loaded position or defaults.
    e.style.top = (_a = p === null || p === void 0 ? void 0 : p.top) !== null && _a !== void 0 ? _a : dT; // Use loaded top or default top.
    e.style.left = (_b = p === null || p === void 0 ? void 0 : p.left) !== null && _b !== void 0 ? _b : dL; // Use loaded left or default left.
    // Handle initial positioning using 'right' (specifically for battery).
    if (e.style.left === "auto" && dR) {
        e.style.right = dR; // Apply default right if left is still auto.
    }
    else {
        e.style.right = "auto"; // Ensure 'right' is 'auto' if 'left' is set.
    }
    // --- Clamp position to viewport boundaries ---
    // Use requestAnimationFrame to ensure styles are applied and dimensions are available.
    requestAnimationFrame(function () {
        try {
            // Get current navbar height (might change on resize, but good enough for load).
            if (navbar)
                navbarHeight = navbar.offsetHeight;
            var r = e.getBoundingClientRect(); // Get widget dimensions and position.
            // Check if widget has valid dimensions (might be 0 if hidden initially).
            if (r.width > 0 && r.height > 0) {
                var cT = r.top; // Current top position.
                var cL = r.left; // Current left position.
                // Calculate maximum allowed top/left based on window size, widget size, and padding.
                var maxTop = window.innerHeight - r.height - WIDGET_POSITION_PADDING;
                var maxLeft = window.innerWidth - r.width - WIDGET_POSITION_PADDING;
                // Calculate minimum allowed top/left based on navbar height and padding.
                var minTop = navbarHeight + WIDGET_POSITION_PADDING;
                var minLeft = WIDGET_POSITION_PADDING;
                // Clamp the current position within the calculated boundaries.
                var clampedTop = Math.max(minTop, Math.min(maxTop, cT));
                var clampedLeft = Math.max(minLeft, Math.min(maxLeft, cL));
                // Apply clamped position only if it changed (avoids unnecessary style updates).
                if (clampedTop !== cT) {
                    e.style.top = "".concat(clampedTop, "px");
                }
                if (clampedLeft !== cL) {
                    e.style.left = "".concat(clampedLeft, "px");
                    e.style.right = "auto"; // Ensure right is auto if left is adjusted.
                }
            }
        }
        catch (err) {
            console.error("Error during position clamping for ".concat(k, ":"), err);
        }
    });
    // Ensure bottom/transform are reset after positioning.
    e.style.bottom = "auto";
    e.style.transform = "none";
}
/**
 * Loads the saved positions for all draggable widgets.
 * Calls loadWidgetPosition for each widget with its specific key and defaults.
 */
function loadAllWidgetPositions() {
    // Define default positions for each widget.
    var defaultClockTop = "400px";
    var defaultClockLeft = "20px";
    var defaultBatteryTop = "100px";
    var defaultBatteryRight = "20px"; // Battery defaults to right side.
    var defaultTodoTop = "100px";
    var defaultTodoLeft = "20px";
    var defaultPomodoroTop = "240px";
    var defaultPomodoroLeft = "20px";
    // Load position for each widget.
    loadWidgetPosition(LSK.clockWidgetPos, digitalClockWidgetElement, defaultClockTop, defaultClockLeft);
    loadWidgetPosition(LSK.batteryPos, batteryWidgetElement, defaultBatteryTop, "auto", // Default left is auto for battery
    defaultBatteryRight // Provide default right
    );
    loadWidgetPosition(LSK.todoPos, todoWidgetElement, defaultTodoTop, defaultTodoLeft);
    loadWidgetPosition(LSK.pomodoroPos, pomodoroWidgetElement, defaultPomodoroTop, defaultPomodoroLeft);
}
// --- Dragging Logic ---
/**
 * Initiates the dragging process for a widget.
 * Sets up pointer capture, initial state, and global event listeners for move/up.
 * @param event - The initial PointerDown event.
 * @param element - The widget's HTML element to be dragged.
 * @param stateSetters - Functions to update the specific widget's dragging state (isDragging, offsetX, offsetY).
 * @param moveHandler - The specific pointermove handler function for this widget.
 * @param upHandler - The specific pointerup handler function for this widget.
 */
function startDragging(event, element, stateSetters, moveHandler, upHandler) {
    // Basic validation.
    if (!element || !(event.target instanceof Node)) {
        return;
    }
    var targetElement = event.target;
    var header = element.querySelector(".widget-header");
    var dragHandle = element.querySelector(".widget-drag-handle");
    // --- Determine if dragging should start ---
    var canDrag = false;
    // Check if the pointerdown occurred within the header element.
    if (header && header.contains(targetElement)) {
        // If a specific drag handle exists, check if the click was on it or the header padding.
        if (dragHandle) {
            canDrag = dragHandle.contains(targetElement) || targetElement === header;
        }
        else {
            // If no specific handle, allow dragging from anywhere in the header.
            canDrag = true;
        }
    }
    // Prevent dragging if:
    // - Click was outside the valid drag area.
    // - Click was on an interactive element within the header (button, input, etc.) or the resize handle.
    if (!canDrag ||
        targetElement.closest("button, input, a, select, textarea, .widget-resize-handle")) {
        return; // Don't initiate drag.
    }
    // Prevent default browser behavior (like text selection).
    event.preventDefault();
    // Capture the pointer to ensure events are received even if pointer leaves the element.
    try {
        element.setPointerCapture(event.pointerId);
    }
    catch (err) {
        console.error("Failed to capture pointer:", err);
        return; // Stop if pointer capture fails.
    }
    // --- Set initial state ---
    stateSetters.setDragging(true); // Mark this widget as being dragged.
    element.classList.add("dragging"); // Add CSS class for visual feedback.
    document.body.style.cursor = "grabbing"; // Change cursor globally.
    document.body.style.userSelect = "none"; // Disable text selection globally.
    if (navbar)
        navbarHeight = navbar.offsetHeight; // Update navbar height for clamping.
    // Calculate the offset between the pointer and the element's top-left corner.
    var rect = element.getBoundingClientRect();
    stateSetters.setOffsetX(event.clientX - rect.left);
    stateSetters.setOffsetY(event.clientY - rect.top);
    // --- Add global listeners for move and up events ---
    document.addEventListener("pointermove", moveHandler);
    // Use 'once: true' for pointerup to automatically remove the listener after firing.
    document.addEventListener("pointerup", upHandler, { once: true });
}
/**
 * Handles the pointer move event during dragging.
 * Updates the widget's position based on pointer movement, clamped within bounds.
 * @param e - The PointerMove event.
 * @param el - The widget's HTML element being dragged.
 * @param s - The dragging state object for the widget (isDragging, offsetX, offsetY).
 */
function dragMove(e, el, s) {
    // Only proceed if this specific widget is being dragged and exists.
    if (!s.isDragging || !el)
        return;
    e.preventDefault(); // Prevent other default actions during move.
    // Calculate new top/left based on pointer position and initial offset.
    var w = el.offsetWidth, h = el.offsetHeight;
    var newTop = e.clientY - s.offsetY, newLeft = e.clientX - s.offsetX;
    // Calculate viewport boundaries, considering padding and navbar height.
    var maxTop = window.innerHeight - h - WIDGET_POSITION_PADDING;
    var maxLeft = window.innerWidth - w - WIDGET_POSITION_PADDING;
    var minTop = navbarHeight + WIDGET_POSITION_PADDING;
    var minLeft = WIDGET_POSITION_PADDING;
    // Clamp the new position within the calculated boundaries.
    newTop = Math.max(minTop, Math.min(maxTop, newTop));
    newLeft = Math.max(minLeft, Math.min(maxLeft, newLeft));
    // Apply the clamped position using inline styles.
    el.style.left = "".concat(newLeft, "px");
    el.style.top = "".concat(newTop, "px");
    // Ensure right/bottom/transform are reset, as 'left' and 'top' now control position.
    el.style.right = "auto";
    el.style.bottom = "auto";
    el.style.transform = "none";
}
/**
 * Handles the pointer up event, ending the drag operation.
 * Releases pointer capture, removes global listeners, resets styles, and saves the position.
 * @param element - The widget's HTML element that was being dragged.
 * @param stateSetters - Function to update the specific widget's dragging state (setDragging).
 * @param moveHandler - The specific pointermove handler to remove.
 * @param storageKey - The localStorage key to save the final position to (optional).
 * @param event - The PointerUp event (optional, used for releasing pointer capture).
 */
function stopDragging(element, stateSetters, moveHandler, storageKey, event // Pass the event to release the correct pointer ID
) {
    // Update the widget's dragging state.
    if (stateSetters) {
        stateSetters.setDragging(false);
    }
    if (element) {
        // Reset visual feedback and release pointer capture.
        element.classList.remove("dragging");
        if (event === null || event === void 0 ? void 0 : event.pointerId) {
            try {
                element.releasePointerCapture(event.pointerId);
            }
            catch (err) {
                // Ignore errors if capture was already released or invalid.
            }
        }
        // Save the final position if a storage key was provided.
        if (storageKey) {
            saveWidgetPosition(storageKey, element);
        }
    }
    // Reset global cursor and text selection styles.
    document.body.style.cursor = "";
    document.body.style.userSelect = "";
    // Remove the global pointermove listener. (Pointerup is removed automatically via 'once: true').
    document.removeEventListener("pointermove", moveHandler);
}
// --- Drag Handlers (Clock, Battery, Todo, Pomodoro) ---
// These functions connect the generic drag logic (start/move/stopDragging)
// to the specific state variables and elements of each widget.
// Clock Widget Drag Handlers
function handleClockPointerDown(event) {
    startDragging(event, digitalClockWidgetElement, {
        // State setters for Clock
        setDragging: function (v) { return (isDraggingClock = v); },
        setOffsetX: function (v) { return (clockOffsetX = v); },
        setOffsetY: function (v) { return (clockOffsetY = v); },
    }, handleClockPointerMove, // Move handler for Clock
    handleClockPointerUp // Up handler for Clock
    );
}
function handleClockPointerMove(event) {
    dragMove(event, digitalClockWidgetElement, {
        // Pass Clock's state
        isDragging: isDraggingClock,
        offsetX: clockOffsetX,
        offsetY: clockOffsetY,
    });
}
function handleClockPointerUp(event) {
    stopDragging(digitalClockWidgetElement, { setDragging: function (v) { return (isDraggingClock = v); } }, handleClockPointerMove, LSK.clockWidgetPos, // Storage key for Clock
    event);
}
// Battery Widget Drag Handlers
function handleBatteryPointerDown(e) {
    // Special case: If battery is positioned with 'right' (initial load),
    // calculate and set 'left'/'top' before starting drag.
    if (batteryWidgetElement &&
        window.getComputedStyle(batteryWidgetElement).left === "auto") {
        var rect = batteryWidgetElement.getBoundingClientRect();
        batteryWidgetElement.style.left = "".concat(rect.left, "px");
        batteryWidgetElement.style.top = "".concat(rect.top, "px");
        batteryWidgetElement.style.right = "auto"; // Switch to left/top positioning.
    }
    startDragging(e, batteryWidgetElement, {
        // State setters for Battery
        setDragging: function (v) { return (isDraggingBattery = v); },
        setOffsetX: function (v) { return (batteryOffsetX = v); },
        setOffsetY: function (v) { return (batteryOffsetY = v); },
    }, handleBatteryPointerMove, handleBatteryPointerUp);
}
function handleBatteryPointerMove(e) {
    dragMove(e, batteryWidgetElement, {
        // Pass Battery's state
        isDragging: isDraggingBattery,
        offsetX: batteryOffsetX,
        offsetY: batteryOffsetY,
    });
}
function handleBatteryPointerUp(e) {
    stopDragging(batteryWidgetElement, { setDragging: function (v) { return (isDraggingBattery = v); } }, handleBatteryPointerMove, LSK.batteryPos, // Storage key for Battery
    e);
}
// To-Do Widget Drag Handlers
function handleTodoPointerDown(e) {
    startDragging(e, todoWidgetElement, {
        // State setters for ToDo
        setDragging: function (v) { return (isDraggingTodo = v); },
        setOffsetX: function (v) { return (todoOffsetX = v); },
        setOffsetY: function (v) { return (todoOffsetY = v); },
    }, handleTodoPointerMove, handleTodoPointerUp);
}
function handleTodoPointerMove(e) {
    dragMove(e, todoWidgetElement, {
        // Pass ToDo's state
        isDragging: isDraggingTodo,
        offsetX: todoOffsetX,
        offsetY: todoOffsetY,
    });
}
function handleTodoPointerUp(e) {
    stopDragging(todoWidgetElement, { setDragging: function (v) { return (isDraggingTodo = v); } }, handleTodoPointerMove, LSK.todoPos, // Storage key for ToDo
    e);
}
// Pomodoro Widget Drag Handlers
function handlePomodoroPointerDown(e) {
    startDragging(e, pomodoroWidgetElement, {
        // State setters for Pomodoro
        setDragging: function (v) { return (isDraggingPomodoro = v); },
        setOffsetX: function (v) { return (pomodoroOffsetX = v); },
        setOffsetY: function (v) { return (pomodoroOffsetY = v); },
    }, handlePomodoroPointerMove, handlePomodoroPointerUp);
}
function handlePomodoroPointerMove(e) {
    dragMove(e, pomodoroWidgetElement, {
        // Pass Pomodoro's state
        isDragging: isDraggingPomodoro,
        offsetX: pomodoroOffsetX,
        offsetY: pomodoroOffsetY,
    });
}
function handlePomodoroPointerUp(e) {
    stopDragging(pomodoroWidgetElement, { setDragging: function (v) { return (isDraggingPomodoro = v); } }, handlePomodoroPointerMove, LSK.pomodoroPos, // Storage key for Pomodoro
    e);
}
// --- To-Do Resizing Logic ---
/**
 * Initiates the resizing process for the To-Do widget.
 * Attached to the pointerdown event on the resize handle.
 * @param e - The PointerDown event on the resize handle.
 */
function handleTodoResizePointerDown(e) {
    if (!todoWidgetElement)
        return;
    // Prevent the drag logic from firing if clicking the resize handle.
    e.stopPropagation();
    e.preventDefault(); // Prevent text selection, etc.
    isResizingTodo = true; // Set resizing state.
    // Capture pointer on the widget element itself.
    try {
        todoWidgetElement.setPointerCapture(e.pointerId);
    }
    catch (err) {
        console.error("Resize pointer capture failed:", err);
        return;
    }
    // Apply visual feedback and global cursor/styles.
    todoWidgetElement.classList.add("resizing");
    document.body.style.cursor = "nwse-resize"; // Diagonal resize cursor.
    document.body.style.userSelect = "none";
    // Store initial dimensions and mouse position for calculating delta.
    if (navbar)
        navbarHeight = navbar.offsetHeight; // Update navbar height.
    initialTodoWidth = todoWidgetElement.offsetWidth;
    initialTodoHeight = todoWidgetElement.offsetHeight;
    initialMouseX = e.clientX;
    initialMouseY = e.clientY;
    // Add global listeners for move and up events.
    document.addEventListener("pointermove", handleTodoResizePointerMove);
    document.addEventListener("pointerup", handleTodoResizePointerUp, {
        once: true, // Remove listener automatically after firing.
    });
}
/**
 * Handles pointer movement during To-Do widget resizing.
 * Calculates and applies new width/height based on mouse delta, clamped by minimum size and viewport bounds.
 * @param e - The PointerMove event.
 */
function handleTodoResizePointerMove(e) {
    // Only run if resizing is active and element exists.
    if (!isResizingTodo || !todoWidgetElement)
        return;
    e.preventDefault();
    // Calculate change in mouse position from start.
    var deltaX = e.clientX - initialMouseX;
    var deltaY = e.clientY - initialMouseY;
    // Calculate potential new dimensions.
    var newWidth = initialTodoWidth + deltaX;
    var newHeight = initialTodoHeight + deltaY;
    // --- Clamp dimensions ---
    var rect = todoWidgetElement.getBoundingClientRect(); // Get current position.
    // Minimum width/height constraints.
    // Maximum width/height constrained by the right/bottom edges of the viewport.
    newWidth = Math.max(MIN_WIDGET_WIDTH, // Minimum width
    Math.min(window.innerWidth - rect.left - WIDGET_POSITION_PADDING, newWidth) // Max width based on viewport right edge
    );
    newHeight = Math.max(MIN_WIDGET_HEIGHT, // Minimum height
    Math.min(window.innerHeight - rect.top - WIDGET_POSITION_PADDING, newHeight) // Max height based on viewport bottom edge
    );
    // Apply the clamped dimensions.
    todoWidgetElement.style.width = "".concat(newWidth, "px");
    todoWidgetElement.style.height = "".concat(newHeight, "px");
}
/**
 * Handles the pointer up event, ending the To-Do widget resizing operation.
 * Releases pointer capture, removes listeners, and resets styles.
 * (Note: To-Do widget size is not currently saved to localStorage).
 * @param e - The PointerUp event.
 */
function handleTodoResizePointerUp(e) {
    if (!isResizingTodo)
        return; // Only run if resizing was active.
    isResizingTodo = false; // Reset resizing state.
    if (todoWidgetElement) {
        // Remove visual feedback and release pointer.
        todoWidgetElement.classList.remove("resizing");
        if (e === null || e === void 0 ? void 0 : e.pointerId) {
            try {
                todoWidgetElement.releasePointerCapture(e.pointerId);
            }
            catch (err) {
                // Ignore errors.
            }
        }
        // TODO: Could potentially save the widget size here if desired.
        // saveWidgetSize(LSK.todoSize, todoWidgetElement);
    }
    // Reset global cursor and styles.
    document.body.style.cursor = "";
    document.body.style.userSelect = "";
    // Remove the global move listener. (Up listener removed by 'once: true').
    document.removeEventListener("pointermove", handleTodoResizePointerMove);
}
// --- Utility Function ---
/**
 * Helper function to add and/or remove multiple CSS classes from multiple elements efficiently.
 * @param c - An object containing `toAdd` and/or `toRemove` properties.
 *            Each property is an object mapping class names to arrays of elements.
 */
function addRemoveClassesOfMultipleElements(c) {
    // Inner helper function to process either adding or removing.
    var process = function (map, // The map of className -> elements
    action // The classList action to perform
    ) {
        if (map) {
            var _loop_1 = function (className, elements) {
                if (Array.isArray(elements)) {
                    // Filter out any null elements and apply the action to each valid element.
                    elements
                        .filter(function (el) { return el !== null; })
                        .forEach(function (el) { return el.classList[action](className); });
                }
            };
            // Iterate through the [className, elementsArray] pairs in the map.
            for (var _i = 0, _a = Object.entries(map); _i < _a.length; _i++) {
                var _b = _a[_i], className = _b[0], elements = _b[1];
                _loop_1(className, elements);
            }
        }
    };
    // Process classes to add, then classes to remove.
    process(c === null || c === void 0 ? void 0 : c.toAdd, "add");
    process(c === null || c === void 0 ? void 0 : c.toRemove, "remove");
}
// --- Dropdown Actions ---
/**
 * Handles the "Copy Link" button click.
 * Copies the current page URL to the clipboard and shows a confirmation tooltip.
 */
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
                    // Use the modern Clipboard API to write text.
                    return [4 /*yield*/, navigator.clipboard.writeText(SITE_URL)];
                case 2:
                    // Use the modern Clipboard API to write text.
                    _a.sent();
                    tooltip_1 = bootstrap.Tooltip.getInstance(button);
                    if (!tooltip_1) {
                        // Initialize tooltip with manual trigger if it doesn't exist.
                        tooltip_1 = new bootstrap.Tooltip(button, { trigger: "manual" });
                    }
                    originalTitle_1 = button.getAttribute("data-bs-original-title") || "Copy Link";
                    // Temporarily change the title to "Copied!".
                    button.setAttribute("data-bs-original-title", "Copied!");
                    tooltip_1.show(); // Manually show the tooltip.
                    // Hide the tooltip and restore original title after a short delay.
                    setTimeout(function () {
                        tooltip_1 === null || tooltip_1 === void 0 ? void 0 : tooltip_1.hide();
                        button.setAttribute("data-bs-original-title", originalTitle_1);
                    }, 1500); // 1.5 seconds delay.
                    return [3 /*break*/, 4];
                case 3:
                    err_1 = _a.sent();
                    // Handle potential errors (e.g., permissions, browser support).
                    console.error("Failed to copy link: ", err_1);
                    alert("Failed to copy link to clipboard."); // Provide user feedback.
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
/**
 * Handles the "Share App" button click.
 * Uses the Web Share API if available, otherwise falls back to copying the link.
 */
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
                    // Call the share method with title, text, and URL.
                    return [4 /*yield*/, navigator.share({
                            title: SITE_TITLE,
                            text: "Keep your screen awake with ".concat(SITE_TITLE, "!"), // Share message.
                            url: SITE_URL,
                        })];
                case 2:
                    // Call the share method with title, text, and URL.
                    _a.sent();
                    console.log("Shared successfully");
                    return [3 /*break*/, 4];
                case 3:
                    err_2 = _a.sent();
                    // Handle errors, ignoring AbortError (user cancelling the share dialog).
                    if (err_2.name !== "AbortError") {
                        console.error("Error sharing:", err_2);
                        // Fallback to copying the link if sharing fails.
                        alert("Could not share the app. Link copied instead!");
                        handleCopyLink();
                    }
                    else {
                        console.log("Share cancelled by user.");
                    }
                    return [3 /*break*/, 4];
                case 4: return [3 /*break*/, 6];
                case 5:
                    // If Web Share API is not supported, inform user and copy link.
                    console.warn("Web Share API not supported. Copying link instead.");
                    alert("Web Share not supported on this browser/device. Link copied instead!");
                    handleCopyLink(); // Fallback to copy.
                    _a.label = 6;
                case 6: return [2 /*return*/];
            }
        });
    });
}
/**
 * Handles the "Install App" button click.
 * Triggers the deferred PWA installation prompt if available.
 */
function handleInstallPWA() {
    return __awaiter(this, void 0, void 0, function () {
        var outcome, err_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    // Check if the installation prompt event was captured and stored.
                    if (!deferredInstallPrompt) {
                        console.log("Install prompt is not available.");
                        // Hide the install button if the prompt is no longer available.
                        if (installPWAItem) {
                            installPWAItem.style.display = "none";
                        }
                        return [2 /*return*/];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    // Show the browser's installation prompt to the user.
                    return [4 /*yield*/, deferredInstallPrompt.prompt()];
                case 2:
                    // Show the browser's installation prompt to the user.
                    _a.sent();
                    console.log("Install prompt shown.");
                    return [4 /*yield*/, deferredInstallPrompt.userChoice];
                case 3:
                    outcome = (_a.sent()).outcome;
                    console.log("User response to the install prompt: ".concat(outcome)); // 'accepted' or 'dismissed'
                    // Hide the install button regardless of the outcome, as the prompt can only be shown once.
                    if (installPWAItem) {
                        installPWAItem.style.display = "none";
                    }
                    // Clear the stored prompt event.
                    deferredInstallPrompt = null;
                    return [3 /*break*/, 5];
                case 4:
                    err_3 = _a.sent();
                    // Handle errors during the prompt process.
                    console.error("Error showing install prompt:", err_3);
                    // Clear the stored prompt event and hide the button on error.
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
/**
 * Initializes the entire application after the DOM is loaded.
 * Queries elements, loads settings, sets up intervals and event listeners.
 */
function initializeApp() {
    console.log("Initializing App...");
    // --- 1. Query DOM Elements ---
    // Fetch references to all necessary HTML elements using their IDs.
    navbar = document.getElementById("navbar");
    favicon = document.getElementById("web-icon");
    keepAwakeSwitch = document.getElementById("keep-awake-switch");
    digitalClockElement = document.getElementById("digital-clock"); // Hero clock
    userGreetingElement = document.getElementById("user-greeting");
    clockFormatSwitch = document.getElementById("clock-format-switch");
    showClockWidgetSwitch = document.getElementById("show-clock-widget-switch");
    showPomodoroWidgetSwitch = document.getElementById("show-pomodoro-widget-switch");
    showBatteryWidgetSwitch = document.getElementById("show-battery-widget-switch");
    showTodoWidgetSwitch = document.getElementById("show-todo-widget-switch");
    minimalModeSwitch = document.getElementById("minimal-mode-switch");
    copyLinkButton = document.getElementById("copy-link-btn");
    shareButton = document.getElementById("share-btn");
    installPWAItem = document.getElementById("install-pwa-item");
    installPWAButton = document.getElementById("install-pwa-btn");
    heroSection = document.getElementById("hero-section");
    statusText = document.getElementById("screen-status");
    infoDisclaimerElement = document.getElementById("info-disclaimer");
    // Widgets (used for various initializations)
    batteryWidgetElement = document.getElementById("battery-widget");
    todoWidgetElement = document.getElementById("todo-widget");
    pomodoroWidgetElement = document.getElementById("pomodoro-widget");
    // Specific widget parts needed early
    addTodoButtonElement = document.getElementById("add-todo-button");
    startPomodoroButtonElement = document.getElementById("start-pomodoro-btn");
    helpModalElement = document.getElementById("helpModal"); // Help modal
    // --- 2. Initialize Bootstrap Tooltips ---
    // Find all elements with the tooltip attribute.
    var tooltipTriggerList = Array.from(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.forEach(function (tooltipTriggerEl) {
        if (tooltipTriggerEl instanceof HTMLElement) {
            // Special handling for the copy button tooltip (manual trigger).
            if (tooltipTriggerEl.id === "copy-link-btn") {
                new bootstrap.Tooltip(tooltipTriggerEl, { trigger: "manual" });
            }
            else {
                // Initialize standard tooltips (hover trigger).
                new bootstrap.Tooltip(tooltipTriggerEl);
            }
        }
    });
    // --- 3. Load User Preferences and State from localStorage ---
    userName = localStorage.getItem(LSK.userName);
    is12HourFormat = localStorage.getItem(LSK.clockFormat) === "12h";
    // Default to true if the setting is not explicitly 'false'.
    clockWidgetVisible = localStorage.getItem(LSK.clockWidgetVisible) !== "false";
    pomodoroVisible = localStorage.getItem(LSK.pomodoroVisible) !== "false";
    batteryVisible = localStorage.getItem(LSK.batteryVisible) !== "false";
    todoVisible = localStorage.getItem(LSK.todoVisible) !== "false";
    // Default to false if the setting is not explicitly 'true'.
    minimalModeActive = localStorage.getItem(LSK.minimalModeActive) === "true";
    // --- 4. Set Initial States of UI Controls ---
    // Set the checked state of switches based on loaded preferences.
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
    updateClock(); // Initial clock update.
    if (clockInterval)
        clearInterval(clockInterval); // Clear any previous interval.
    clockInterval = window.setInterval(updateClock, 1000); // Start clock update interval.
    // Initialize each feature/widget module.
    initializeDigitalClockWidget(); // Setup clock widget dragging.
    initializeBatteryIndicator(); // Setup battery widget.
    initializeTodoList(); // Setup To-Do list widget.
    initializePomodoroTimer(); // Setup Pomodoro timer widget.
    // Load saved widget positions after widgets are initialized.
    loadAllWidgetPositions();
    // Apply initial visibility settings based on loaded state.
    applyAllWidgetVisibilities();
    // --- 6. Handle User Greeting ---
    // Prompt for name if not found in localStorage, otherwise update greeting.
    if (!userName)
        promptForName();
    else
        updateGreeting();
    // --- 7. Add Core Event Listeners ---
    // Attach event handlers to UI controls.
    keepAwakeSwitch === null || keepAwakeSwitch === void 0 ? void 0 : keepAwakeSwitch.addEventListener("change", changeSwitch);
    clockFormatSwitch === null || clockFormatSwitch === void 0 ? void 0 : clockFormatSwitch.addEventListener("change", handleClockFormatToggle);
    showClockWidgetSwitch === null || showClockWidgetSwitch === void 0 ? void 0 : showClockWidgetSwitch.addEventListener("change", handleShowClockToggle);
    showPomodoroWidgetSwitch === null || showPomodoroWidgetSwitch === void 0 ? void 0 : showPomodoroWidgetSwitch.addEventListener("change", handleShowPomodoroToggle);
    showBatteryWidgetSwitch === null || showBatteryWidgetSwitch === void 0 ? void 0 : showBatteryWidgetSwitch.addEventListener("change", handleShowBatteryToggle);
    showTodoWidgetSwitch === null || showTodoWidgetSwitch === void 0 ? void 0 : showTodoWidgetSwitch.addEventListener("change", handleShowTodoToggle);
    minimalModeSwitch === null || minimalModeSwitch === void 0 ? void 0 : minimalModeSwitch.addEventListener("change", handleMinimalModeToggle);
    copyLinkButton === null || copyLinkButton === void 0 ? void 0 : copyLinkButton.addEventListener("click", handleCopyLink);
    shareButton === null || shareButton === void 0 ? void 0 : shareButton.addEventListener("click", handleShare);
    installPWAButton === null || installPWAButton === void 0 ? void 0 : installPWAButton.addEventListener("click", handleInstallPWA);
    // No listener needed for help button - Bootstrap's data attributes handle modal toggle.
    // --- 8. Set Initial NoSleep State and UI ---
    // Sync the NoSleep library state and UI with the initial state of the switch.
    if (keepAwakeSwitch) {
        var isChecked = keepAwakeSwitch.checked; // Read initial state from the DOM.
        // Update UI to match the switch state.
        changeStatusText(isChecked);
        changeBackground(isChecked);
        changeFavicon(isChecked);
        // Enable NoSleep library if the switch is initially checked.
        if (isChecked) {
            nosleep.enable().catch(handleNoSleepError); // Enable and handle potential errors.
        }
    }
    else {
        // If the switch isn't found, log error and default to 'sleepy' state UI.
        console.error("Keep awake switch not found! Cannot initialize NoSleep.");
        changeBackground(false);
        changeStatusText(false);
        changeFavicon(false);
    }
    // --- 9. PWA Service Worker Registration ---
    // Check if service workers are supported by the browser.
    if ("serviceWorker" in navigator) {
        // Register the service worker after the page has loaded.
        window.addEventListener("load", function () {
            navigator.serviceWorker
                .register("./service-worker.js") // Path to the service worker file.
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
    console.log("App Initialization Complete.");
}
// --- Run Initialization ---
// Add listener to run initializeApp once the DOM is fully loaded and parsed.
window.addEventListener("DOMContentLoaded", initializeApp);
// --- Global Event Listeners ---
// Listen for the page trying to unload.
window.addEventListener("beforeunload", function () {
    // Save the Pomodoro state if it's running to preserve time across reloads/closes.
    if (isPomodoroRunning)
        savePomodoroState();
});
// Listen for the browser firing the PWA installation prompt event.
window.addEventListener("beforeinstallprompt", function (e) {
    // Prevent the default mini-infobar from appearing on mobile.
    e.preventDefault();
    // Store the event object so it can be triggered later by the install button.
    deferredInstallPrompt = e;
    console.log("`beforeinstallprompt` event fired. PWA install available.");
    // Show the custom install button in the settings dropdown.
    if (installPWAItem) {
        installPWAItem.style.display = "block";
    }
});
// Listen for the app being successfully installed.
window.addEventListener("appinstalled", function () {
    console.log("PWA was installed successfully!");
    // Hide the install button as it's no longer needed.
    if (installPWAItem) {
        installPWAItem.style.display = "none";
    }
    // Clear the stored prompt event.
    deferredInstallPrompt = null;
});
