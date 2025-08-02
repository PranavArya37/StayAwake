document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const body = document.body;
    const greetingEl = document.getElementById('greeting');
    const datetimeEl = document.getElementById('datetime');
    const statusHeadingEl = document.getElementById('status-heading');
    const toggleSwitch = document.getElementById('wake-lock-toggle');

    let timeInterval;

    function updateDateTimeAndGreeting() {
        const now = new Date();
        const hour = now.getHours();

        // Set Greeting Text
        if (hour < 12) {
            greetingEl.textContent = 'Good Morning!';
        } else if (hour < 18) {
            greetingEl.textContent = 'Good Afternoon!';
        } else {
            greetingEl.textContent = 'Good Evening!';
        }

        // Set Date and Time
        const options = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        };
        datetimeEl.textContent = now.toLocaleString('en-US', options).replace(' at ', ', ');
    }

    function updateVisualState(isActive) {
        if (isActive) {
            body.className = 'state-active';
            greetingEl.className = 'state-active';
            statusHeadingEl.className = 'state-active';
            statusHeadingEl.textContent = 'Awake';
        } else {
            body.className = 'state-inactive';
            greetingEl.className = 'state-inactive';
            statusHeadingEl.className = 'state-inactive';
            statusHeadingEl.textContent = 'Almost sleepy';
        }
    }

    // Load initial state from storage and set UI
    chrome.storage.local.get('isActive', (data) => {
        const isActive = data.isActive || false;
        updateVisualState(isActive);
        toggleSwitch.checked = isActive;
    });

    // Listen for toggle changes
    toggleSwitch.addEventListener('change', () => {
        const newState = toggleSwitch.checked;
        updateVisualState(newState);

        // Send command to the background script
        chrome.runtime.sendMessage({ command: 'toggle', state: newState }, (response) => {
            if (chrome.runtime.lastError) {
                console.error("Error sending message:", chrome.runtime.lastError.message);
            }
        });
    });

    // Start the clock and set an interval to update it
    updateDateTimeAndGreeting();
    timeInterval = setInterval(updateDateTimeAndGreeting, 1000);

    // Clear the interval when the popup is closed to save resources
    window.addEventListener('unload', () => {
        if (timeInterval) {
            clearInterval(timeInterval);
        }
    });
});