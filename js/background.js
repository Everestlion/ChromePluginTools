var validUrls = ["https://cloud.smartisan.com/#/notes", "http://localhost:8090/"];
function getDomainFromUrl(url){
	var host = "null";
	if(typeof url == "undefined" || null == url)
		url = window.location.href;
	var regex = /.*\:\/\/([^\/]*).*/;
	var match = url.match(regex);
	if(typeof match != "undefined" && null != match)
		host = match[1];
	return host;
}

function checkForValidUrl(tabId, changeInfo, tab) {
	//console.log(tab.url);
	for (var url in validUrls )
	{
		if(tab.url.toLowerCase()==validUrls[url]){
			chrome.pageAction.show(tabId);
			break;
		}
	}
	
};

function iconClick(tab) {
	invokeFunMsg("ss");
}

chrome.tabs.onUpdated.addListener(checkForValidUrl);

//chrome.pageAction.onClicked.addListener(iconClick);

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
	if (request.type){
		switch(request.type) {
			case "invokeWebFunc":
				invokeFunMsg(request.func);
				break;
			default:
				sendResponse({});
				break;
		}
	}
	
});

//setInterval(function(){console.log("interval....");}, 5000);

var data = "no result";

var pjj = false;

function setData(d) {
	data = d;
}

function getData(d) {
	return data;
}

function invokeFunMsg(funName, params, callBack) {
	var message = {
		type: "invokeWebFunc",
		funName: funName,
		params: params
	
	};
	pjj = true;
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
	  chrome.tabs.sendMessage(tabs[0].id, message, function(response) {
		if (response != undefined) {
	  		process(response.data);
		}
	  });
	  
	});
	 //chrome.tabs.executeScript(null, {file: "tools.js"});

}

function process(d) {
	console.log("process.....");
	data = d;
	//console.log(data);
	pjj = false;
}

function testAlert() {
	alert("testAlert()");
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

