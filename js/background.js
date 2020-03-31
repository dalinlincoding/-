// var names=[]
// chrome.storage.local.get('names', function(result){
//     names = result.names
//     chrome.runtime.sendMessage(names)
//     console.log(names)
// });
// chrome.runtime.onMessage.addListener(function(message, sender, sendResponse){
//     console.log(message)
//     var name = message
//     names.push(name)
//     chrome.storage.local.set({'names':names}, function(){
//         chrome.storage.local.get('names', function(result){
//           names = result.names
//         });
//     });
    
// });
chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {
  if (changeInfo.status == 'complete') {
    console.log("LOADED");
    setTimeout(msg(), 1000);
    // chrome.runtime.sendMessage('loaded')
    // 
  }
})
function msg(){
  sendMessageToContentScript('loaded', (response) => {
  if(response) console.log('backgrond收到来自content-script的回复：'+response);
  });
}
function getCurrentTabId(callback)
{
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs)
  {
    console.log('from tab') 
    if(callback) callback(tabs.length ? tabs[0].id: null);
  });
}

function sendMessageToContentScript(message, callback)
{
  getCurrentTabId((tabId) =>
  {
    chrome.tabs.sendMessage(tabId, message, function(response)
    {
      if(callback) callback(response);
  //     if(callback) callback();
    });
  });
}