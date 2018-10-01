chrome.browserAction.onClicked.addListener(send);

function send(tab) {
	msg = { txt: "execute" };
	chrome.tabs.sendMessage(tab.id, msg);
}