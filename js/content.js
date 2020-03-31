var names = []
function getNames(){
  var ls = localStorage.getItem('names')
  // console.log(222,ls)
  if(ls&&ls!='undefined'){
    chrome.extension.sendMessage(JSON.parse(ls),function (response) {
      console.log( "fromcontentscript");
    })
  }
}
$(document).ready(function(){
  var ls = localStorage.getItem('names')
  // console.log(111,ls)
  if(ls&&ls!='undefined'){
    var list = JSON.parse(ls)
    for(var l=0;l<list.length;l++){
      repName(list[l])
    }
  }
})
function repName(name){
  var content = document.body.innerHTML; 
  var regExp = new RegExp(name.oldname,'g');
  content = content.replace(regExp, name.newname);
  // console.log(content)
  document.body.innerHTML = content;
}
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse){
    // console.log('msg',message)
    // if(message.indexOf('remove')>0){
    //   var i = message.splice(0,5)*1
    //   console.log(i)
    //   names.splice(i,1)
    // }
    if(message == 'clear'){
      localStorage.removeItem('names');
    }else if(message == 'new' || message=='loaded'){
      getNames()
    }else{
      var name = message
      repName(name)
      names.push(name)
      // console.log('add',names)
      localStorage.setItem('names',JSON.stringify(names));
    }
       sendResponse({farewell: "ok"});   //注意，注意，注意就是这个sendResponse函数一定要调用，否则就会报错
    
});

