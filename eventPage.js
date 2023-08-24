let menuItem = {
	"id": "search",
	"title": "ResearchKit",
	"contexts": ["selection"]
};

// "web_accessible_resources": ["get_api.js"]

chrome.contextMenus.create(menuItem);

function fixedEncodeURI (str){
	return encodeURI(str).replace(/%5B/g, '[').replace(/%5D/g, ']');
}

var gptInput = "";
var gptReturn = "";

chrome.contextMenus.onClicked.addListener(function(clickData){
	if(clickData.menuItemId=="search" && clickData.selectionText){
		let wikiUrl = "https://en.wikipedia.org/wiki/"+fixedEncodeURI(clickData.selectionText);
		let createData = {
			"url": wikiUrl,
			"type": "normal",
			// "state": "maximized"
		};
		smmryURL = "https://smmry.com/"+wikiUrl+"#&SM_LENGTH=10&SM_KEYWORD=1&SM_HEAT_MAP";
		
		// function(currentWindow){
		// 	chrome.windows.update(currentWindow.id, { 
		// 		"width": Math.round(currentWindow.width*0.5)+5,
		// 		"height": Math.round(currentWindow.height*0.5)+5
		// 	});
		// }
		let wikiWindow = chrome.windows.create(createData);

		let createData2 = {
			"url": smmryURL,
			"windowId": wikiWindow.id
			// "type": "popup",
			// "state": "maximized"
		};
		chrome.tabs.create(createData2)

		// wikiWindow.top = 5;
		// wikiWindow.left = 5;
		// wikiWindow.width = Math.round(wikiWindow.screen.availWidth/2)+5;
		// wikiWindow.height = Math.round(wikiWindow.screen.availHeight/2)+5;

		// let wikiSummry = chrome.windows.create(createData2, function(currentWindow){
		// 	chrome.windows.update(currentWindow.id, { "top": Math.round(currentWindow.width/2)+5, 
		// 		"left": 5, 
		// 		"width": Math.round(currentWindow.width*0.67)+5,
		// 		"height": Math.round(currentWindow.height*0.67)+5
		// 	});
		// });
		// wikiSummry.top = Math.round(wikiSummry.screen.availHeight/2)+5;
		// wikiSummry.left = 5;
		// wikiSummry.width = Math.round(wikiSummry.screen.availWidth/2)+5;
		// wikiSummry.height = Math.round(wikiSummry.screen.availHeight/2)+5;

		//completion.data.choices[0].text

		let createData3 = {
			"url": "chatgpt.html?input="+fixedEncodeURI(clickData.selectionText),
			"windowId": wikiWindow.id
		};
		chrome.tabs.create(createData3);

		// let gptwindow = chrome.windows.create(createData3, function(currentWindow){
		// 	chrome.windows.update(currentWindow.id, { "top": 5, 
		// 		"left": Math.round(currentWindow.screen.availWidth/2)+75, 
		// 		"width": Math.round(currentWindow.screen.availWidth/2)+5,
		// 		"height": Math.round(currentWindow.screen.availHeight/2)+5
		// 	});
		// });

		// gptwindow.top = 5;
		// gptwindow.left = Math.round(gptwindow.screen.availWidth/2)+75;
		// gptwindow.width = Math.round(gptwindow.screen.availWidth/2)+5;
		// gptwindow.height = Math.round(gptwindow.screen.availHeight/2)+5;
		

		// let britUrl = "https://www.britannica.com/topic/"+fixedEncodeURI(clickData.selectionText);
		// let createData3 = {
		// 	"url": britUrl,
		// 	"type": "popup",
		// 	"top": 5,
		// 	"left": Math.round(screen.availWidth/2)+75,
		// 	"width": Math.round(screen.availWidth/2),
		// 	"height": Math.round(screen.availHeight/2)
		// };
		// chrome.windows.create(createData3, function(){});
		// let britUrl2 = "https://smmry.com/"+britUrl+"#&SM_LENGTH=10&SM_KEYWORD=1&SM_HEAT_MAP";
		// let createData4 = {
		// 	"url": britUrl2,
		// 	"type": "popup",
		// 	"top": Math.round(screen.availHeight/2)+5,
		// 	"left": Math.round(screen.availWidth/2)+75,
		// 	"width": Math.round(screen.availWidth/2),
		// 	"height": Math.round(screen.availHeight/2)
		// };
		// chrome.windows.create(createData4, function(){});
		// alert("To close everything quickly, just press Ctrl+W 3 times!")
	}
});

