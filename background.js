browser.browserAction.onClicked.addListener(async (tab) => {
  try {
    // Send message to content script
    const response = await browser.tabs.sendMessage(tab.id, {action: "scrapeJob"});
    
    if (response) {
      await navigator.clipboard.writeText(response.tsvData);
      console.log('Copied to clipboard:', response.tsvData);
    }
  } catch (err) {
    console.error('Failed to copy job data:', err);
  }
});