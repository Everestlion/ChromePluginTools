//alert("HelloWorld");
//setTimeout(function(){alert("timeout");}, 5000);
function ss(){
	var iframe = document.getElementById("cloud_app_notes");
	var str = iframe.contentWindow.window.eval("(function(){var appElement = document.querySelector('[ng-controller=\"NoteListCtrl\"]');var $scope = angular.element(appElement).scope();var allNoteStr, noteStr; var dateObj, year, month, date, hour, minute, second, dateStr; for(var i = 0; i < $scope.sortNoteList.length;i++){dateObj = new Date(parseInt($scope.sortNoteList[i].modify_time));year=dateObj.getFullYear();month=dateObj.getMonth()+1;date=dateObj.getDate(); hour=dateObj.getHours(); minute=dateObj.getMinutes(); second=dateObj.getSeconds(); dateStr=year+\"-\"+month+\"-\"+date+\" \"+hour+\":\"+minute+\":\"+second; noteStr = i + '、' + $scope.sortNoteList[i].detail + \"\\r\\n\" + '-'+dateStr + \"\\r\\n\" + \"\\r\\n\"; allNoteStr += noteStr;} return allNoteStr;})();");
}

function test() {
	//把js代码注入到web page中，在web page的沙盒中执行
	var iframe = document.getElementById("cloud_app_notes");
	var rr = iframe.contentWindow.document.getElementById("rr");
	//var editor = iframe.contentWindow.document.getElementById("editor");
	if(rr == null){
		var sss = iframe.contentWindow.document.createElement("script");
		sss.setAttribute("type", "text/javascript");
		sss.innerHTML = "function sss(e){var appElement = document.querySelector('[ng-controller=\"NoteListCtrl\"]');var $scope = angular.element(appElement).scope();var allNoteStr='', noteStr; var dateObj, year, month, date, hour, minute, second, dateStr; for(var i = 0; i < $scope.sortNoteList.length;i++){dateObj = new Date(parseInt($scope.sortNoteList[i].modify_time));year=dateObj.getFullYear();month=dateObj.getMonth()+1;date=dateObj.getDate(); hour=dateObj.getHours(); minute=dateObj.getMinutes(); second=dateObj.getSeconds(); dateStr=year+\"-\"+month+\"-\"+date+\" \"+hour+\":\"+minute+\":\"+second; noteStr = i + '、' + $scope.sortNoteList[i].detail + \"\\r\\n\" + '-'+dateStr + \"\\r\\n\" + \"\\r\\n\"; allNoteStr += noteStr;} e.setAttribute('contentText',allNoteStr);return allNoteStr;}";
		iframe.contentWindow.document.body.appendChild(sss);
		rr = iframe.contentWindow.document.createElement("iframe");
		//rr.setAttribute("src", "https://www.baidu.com");
		rr.setAttribute("onclick", "sss(this)");
		rr.setAttribute("id", "rr");
		rr.setAttribute("height", "0");
		//rr.setAttribute("contentText", "");
		iframe.contentWindow.document.body.appendChild(rr);
	}
	rr.click();
	var data =  rr.getAttribute("contentText");
	rr.setAttribute("contentText", "");
	return data;
	//iframe.contentWindow.window.sss();//不在同一沙盒
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
	if(request.type == "invokeWebFunc"){
		var data = test();
		sendResponse({data: data});
	}
	if(request.type == "getNotes"){
		var data = test();
		sendResponse({type:request.type, data: data});
	}
	
});

function getBase64Image(img) {
	var iframe = document.getElementById("cloud_app_notes");
	var canvas = iframe.contentWindow.document.createElement("canvas");
	canvas.width = img.width;
	canvas.height = img.height;
	var ctx = canvas.getContext("2d");
	ctx.drawImage(img, 0, 0, img.width, img.height);

	var dataURL = canvas.toDataURL("image/jpeg");
	return dataURL.replace("data:image/jpeg;base64,", "");
}

//chrome.extension.sendMessage 