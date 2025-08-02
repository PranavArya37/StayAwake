// Function to update the extension icon based on the current state
function updateIcon(isActive) {
    const path = isActive ? "icons/icon_active_" : "icons/icon_inactive_";
    chrome.action.setIcon({
        path: {
            "16": `${path}16x16.png`,
            "48": `${path}48x48.png`,
            "128": `${path}128x128.png`,
        },
    });
}

// Set initial state when the extension is installed
chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.set({ isActive: false });
    console.log("StayAwake extension installed and initialized to inactive state.");
});

// Listen for messages from the popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.command === "toggle") {
        const newState = request.state;

        if (newState) {
            // Request to keep the screen awake
            chrome.power.requestKeepAwake('display');
            console.log("StayAwake activated: Screen will be kept on.");
        } else {
            // Release the wake lock
            chrome.power.releaseKeepAwake();
            console.log("StayAwake deactivated: Screen can now sleep.");
        }

        // Update the icon and save the new state
        updateIcon(newState);
        chrome.storage.local.set({ isActive: newState });
        sendResponse({ status: "State updated successfully" });
    }
    return true; // Keep the message channel open for async response
});