chrome.runtime.onInstalled.addListener((details) => {
  chrome.contextMenus.create({
    title: 'Test',
    id: 'contextMenu1',
    contexts: ['page', 'selection'],
  });
  chrome.contextMenus.onClicked.addListener((event) => {
    chrome.tabs.create({
      url: `https://www.imdb.com/find/?q=${event.selectionText}&ref_=nv_sr_sm`,
    });
  });
});

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  console.log('logging message', msg, sender, sendResponse);
  sendResponse('sendresponse function in background');
  chrome.tabs.sendMessage(sender.tab.id, 'Got your message - background');
});
