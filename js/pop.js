var imgUrlBase = "https://cloud.smartisan.com/apps/note/notesimage/";

//chrome.tabs.sendMessage发送消息给Content Script
var processBtn = $("#visible").click(function (){
	
});

function processResponse(response) {
	if (response != undefined) {
		switch (response.type)
		{
		case "getNotes":
			createSaveBtn(response.data);
			break;
		default:
			break;
		}
	  		
	}
	
}
//processBtn.addEventListener("click", createSaveBtn);


//swfobject.registerObject("CreateSaveWindow", "22.0.0", "media/CreateSaveWindow.swf");

document.addEventListener('DOMContentLoaded',function(){
	//doAction();
	//b();
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		if (tabs[0].url == "https://cloud.smartisan.com/#/notes"){
			chrome.tabs.sendMessage(tabs[0].id, {type:"getNotes",msg:""}, processResponse);
		}
	  
	 });

},false);

function b(){$(".i18n").each(function(){var a=this,b=a.id;$(a).html(chrome.i18n.getMessage(b.replace(/-/,"")))}),$(".title").each(function(){var a=this,b=a.id;$(a).attr({title:chrome.i18n.getMessage(b.replace(/-/,"")+"_title")})})}

function initPage() {
	$("#visible").find(".shortcut").remove().end().append("<span class='shortcut'>"+b+"</span>");
	$("#selected").find(".shortcut").remove().end().append("<span class='shortcut'>"+c+"</span>");
	$("#entire").find(".shortcut").remove().end().append("<span class='shortcut'>"+d+"</span>");
}

function getSwfInstance(movieName) { 
  if (navigator.appName.indexOf("Microsoft") != -1) { 
    return window[movieName]; 
  } else { 
    return document[movieName]; 
  } 
} 


function getMovie(movieName){
	if (window.document[movieName])
	{
		return window.document[movieName];
	}
	if (navigator.appName.indexOf("Microsoft Internet")==-1) {
		if (document.embeds && document.embeds[movieName])
		return document.embeds[movieName];
	} else { // if (navigator.appName.indexOf("Microsoft Internet")!=-1)
		return document.getElementById(movieName);
	}
}

function callBackBridge() {
  //alert(getSwfInstance("CreateSaveWindow").flashvars);
  return getSwfInstance("CreateSaveWindow").callAsFunction("Hello, army!"); 
}

var interval;
function doAction(){
	//alert(chrome.extension.getBackgroundPage().name);
	chrome.extension.getBackgroundPage().invokeFunMsg("ss");//在这里调用的方法中使用了其中的变量，如果在当前方法内再引用这个变量就会起冲突
	
	//interval = setInterval(createSaveBtn(), 1000);//安全沙箱问题，无法运行
	interval = setInterval(function(){createSaveBtn();}, 10);
}

function createSaveBtn(d) {
	//console.log("createSaveBtn();;;;;;;");
	//if(!d || d.length < 0){
	//	alert("error!!");
	//}

	//var reg = new RegExp("&", "g");//使用RegExp，"g"表示全局替换，replace（）只替换第一个
	//d = d.replace(reg, "{and}");

	var dataType = "base64";
	if (dataType == "base64")
	{
		var base64 = new Base64();
		d = base64.encode(d);
		//如果字符串中含有"+"号，网络传输后"+"号会消失，url中带加号处理 http://blog.csdn.net/z69183787/article/details/35987711
		var reg = new RegExp("\\+", "g");//使用RegExp，"g"表示全局替换，replace（）只替换第一个
		d = d.replace(reg, "%2b");
	}
	var filename = "便签_锤子科技.txt";
	var wrap = document.querySelector("[id=\"save-flash-btn\"]");
	var type = 1;
	if (type == 1)
	{
		wrap.innerHTML='<div id="flash-save"></div>';
		var g="10",h=null,i={data:d,dataType:dataType,filename:filename,width:100,height:30},j={allowScriptAccess:"always"},k={};
		k.id="CreateSaveWindow",k.name="CreateSaveWindow",k.align="middle";
		swfobject.embedSWF("media/CreateSaveWindow.swf","flash-save","100","30",g,h,i,j,k);
		setTimeout(function (){$("#l-s-btn").click()}, 2000);
		$("#l-s-btn").css("display", "inline-block");
	} else {
		$("<iframe frameBorder=0 src='http://localhost:8090/ChromeTools/save.html'>").appendTo(wrap);
	}
	
	$("#title").css("float", "left");
}

function sleep(numberMillis) {    
	var now = new Date();  
	var exitTime = now.getTime() + numberMillis;     
	while (true) {        
		now = new Date();        
		if (now.getTime() > exitTime)    
		return;    
	}
}

function callBackBridge() {
	console.log("Hello form as");
}

