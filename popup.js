document.getElementById('toggleButton').addEventListener('click', () => {
    chrome.storage.sync.get(['enabled'], (result) => {
        const enabled = !result.enabled;
        chrome.storage.sync.set({ enabled });
        document.getElementById('toggleButton').textContent = enabled ? "Disable" : "Enable";

        // Send a message to the content script to enable/disable the extension
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, { action: enabled ? "enable" : "disable" });
        });
    });
});

// Set the initial state of the button
chrome.storage.sync.get(['enabled'], (result) => {
    document.getElementById('toggleButton').textContent = result.enabled ? "Disable" : "Enable";
});
