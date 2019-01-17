let menuItem = {
	"id": "search",
	"title": "ResearchKit",
	"contexts": ["selection"]
};

chrome.contextMenus.create(menuItem);

function fixedEncodeURI (str){
	return encodeURI(str).replace(/%5B/g, '[').replace(/%5D/g, ']');
}

chrome.contextMenus.onClicked.addListener(function(clickData){
	if(clickData.menuItemId=="search" && clickData.selectionText){
		let wikiUrl = "https://en.wikipedia.org/wiki/"+fixedEncodeURI(clickData.selectionText);
		let createData = {
			"url": wikiUrl,
			"type": "popup",
			"top": 5,
			"left": 5,
			"width": Math.round(screen.availWidth/2),
			"height": Math.round(screen.availHeight/2)
		};
		smmryURL = "https://smmry.com/"+wikiUrl+"#&SM_LENGTH=10&SM_KEYWORD=1&SM_HEAT_MAP";
		let createData2 = {
			"url": smmryURL,
			"type": "popup",
			"top": Math.round(screen.availHeight/2)+5,
			"left": 5,
			"width": Math.round(screen.availWidth/2),
			"height": Math.round(screen.availHeight/2)
		};
		chrome.windows.create(createData, function(){});
		chrome.windows.create(createData2, function(){});
		let britUrl = "https://www.britannica.com/topic/"+fixedEncodeURI(clickData.selectionText);
		let createData3 = {
			"url": britUrl,
			"type": "popup",
			"top": 5,
			"left": Math.round(screen.availWidth/2)+75,
			"width": Math.round(screen.availWidth/2),
			"height": Math.round(screen.availHeight/2)
		};
		chrome.windows.create(createData3, function(){});
		let britUrl2 = "https://smmry.com/"+britUrl+"#&SM_LENGTH=10&SM_KEYWORD=1&SM_HEAT_MAP";
		let createData4 = {
			"url": britUrl2,
			"type": "popup",
			"top": Math.round(screen.availHeight/2)+5,
			"left": Math.round(screen.availWidth/2)+75,
			"width": Math.round(screen.availWidth/2),
			"height": Math.round(screen.availHeight/2)
		};
		chrome.windows.create(createData4, function(){});
		alert("To close everything quickly, just press Ctrl+W 4 times!")
	}
});