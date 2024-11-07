chrome.runtime.onInstalled.addListener(() => {
  if (chrome.sidePanel) {
    chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true })
      .catch((error) => console.error('Error setting panel behavior:', error));
  } else {
    console.error('chrome.sidePanel is not available');
  }
});

  