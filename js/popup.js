var names = [],i=0
$(document).ready(function(){
  sendMessageToContentScript('new', (response) => {});
  chrome.extension.onMessage.addListener(function(message, sender, sendResponse){
      // console.log(message)
      names = message
      for(i =0;i<names.length;i++){
        var item = names[i]
        var p = $("<div id='name"+i + "' >" + '&nbsp;&nbsp;'+item.oldname+'&nbsp;:&nbsp;'+item.newname + "<img class='dele' id='dele"+i + "' src='./images/menu_dele.png' ></div>")
        var name = {'oldname':item.oldname,'newname':item.newname}
        $('#names')[0].after(p[0])
        let j = i
        $('#dele'+j).on('click',function(){
          // console.log('dele'+j,999)
            sendMessageToContentScript('dele'+j, (response) => {
              window.location.reload()
            });
        });
      }
       sendResponse({farewell: "ok"});   //注意，注意，注意就是这个sendResponse函数一定要调用，否则就会报错
  })
  $("form").submit(function(){
      event.preventDefault() 
    // console.log('submit')
      var p = $("<div id='name"+i + "' >" + '&nbsp;&nbsp;'+$('#oldname')[0].value+'&nbsp;:&nbsp;'+$('#newname')[0].value + "<img class='dele' id='dele"+i + "' src='./images/menu_dele.png' ></div>")
      var name = {'oldname':$('#oldname')[0].value,'newname':$('#newname')[0].value}
      $('#names')[0].after(p[0])
      // console.log(p)
      let j = i
      $('#dele'+j).on('click',function(){
        console.log('dele'+j,999)
          sendMessageToContentScript('dele'+j, (response) => {
            window.location.reload()
          });
      });
      i++
      sendMessageToContentScript(name, (response) => {
        names.push(name)
      });
  });
  $("#clear").click(function(){
    // console.log('clear')
      sendMessageToContentScript('clear', (response) => {
        window.location.reload()
      });
  });
});
function getCurrentTabId(callback)
{
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs)
  {
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
    });
  });
}


