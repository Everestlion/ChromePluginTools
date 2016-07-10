//alert("HelloWorld");
//setTimeout(function(){alert("timeout");}, 5000);
function ss(){
	var iframe = document.getElementById("cloud_app_notes");
	var str = iframe.contentWindow.window.eval("(function(){var appElement = document.querySelector('[ng-controller=\"NoteListCtrl\"]');var $scope = angular.element(appElement).scope();var allNoteStr, noteStr; var dateObj, year, month, date, hour, minute, second, dateStr; for(var i = 0; i < $scope.sortNoteList.length;i++){dateObj = new Date(parseInt($scope.sortNoteList[i].modify_time));year=dateObj.getFullYear();month=dateObj.getMonth()+1;date=dateObj.getDate(); hour=dateObj.getHours(); minute=dateObj.getMinutes(); second=dateObj.getSeconds(); dateStr=year+\"-\"+month+\"-\"+date+\" \"+hour+\":\"+minute+\":\"+second; noteStr = i + '、' + $scope.sortNoteList[i].detail + \"\\r\\n\" + '-'+dateStr + \"\\r\\n\" + \"\\r\\n\"; allNoteStr += noteStr;} return allNoteStr;})();");
}

function test() {
	var iframe = document.getElementById("cloud_app_notes");
	var sss = iframe.contentWindow.document.createElement("script");
	sss.setAttribute("type", "text/javascript");
	sss.innerHTML = "function sss(e){var appElement = document.querySelector('[ng-controller=\"NoteListCtrl\"]');var $scope = angular.element(appElement).scope();var allNoteStr='', noteStr; var dateObj, year, month, date, hour, minute, second, dateStr; for(var i = 0; i < $scope.sortNoteList.length;i++){dateObj = new Date(parseInt($scope.sortNoteList[i].modify_time));year=dateObj.getFullYear();month=dateObj.getMonth()+1;date=dateObj.getDate(); hour=dateObj.getHours(); minute=dateObj.getMinutes(); second=dateObj.getSeconds(); dateStr=year+\"-\"+month+\"-\"+date+\" \"+hour+\":\"+minute+\":\"+second; noteStr = i + '、' + $scope.sortNoteList[i].detail + \"\\r\\n\" + '-'+dateStr + \"\\r\\n\" + \"\\r\\n\"; allNoteStr += noteStr;} e.setAttribute('contentText',allNoteStr);return allNoteStr;}";
	iframe.contentWindow.document.body.appendChild(sss);
	var rr = iframe.contentWindow.document.createElement("iframe");
	//rr.setAttribute("src", "https://www.baidu.com");
	rr.setAttribute("onclick", "sss(this)");
	rr.setAttribute("id", "rr");
	//rr.setAttribute("contentText", "");
	iframe.contentWindow.document.body.appendChild(rr);
	var str = rr.click();
	return rr.getAttribute("contentText");
	//iframe.contentWindow.window.sss();
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
	if(request.type == "invokeWebFunc"){
		//var data = ss();
		var data = test();
		sendResponse({data: data});
	}
	if(request.type == "getNotes"){
		var data = test();
		sendResponse({data: data});
	}
	
});

//chrome.extension.sendMessage 