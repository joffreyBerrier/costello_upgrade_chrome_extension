chrome.runtime.onMessage.addListener(receive);

function includeBadges(index) {
	if (document.querySelectorAll('.list-card:not(.hide)')[index]) {
		
		var filteredBadges = Object.values(document.querySelectorAll('.js-list-content')[index].querySelectorAll('.list-card:not(.hide)'))
			.map(x => x.innerText)
			.map(x => x.split('Total Cost: ')[1])
			.filter(x => x !== undefined)
			.map(x => parseInt(x))
	} else {
		var filteredBadges = Object.values(document.querySelectorAll('.js-list-content')[index].querySelectorAll('.js-plugin-badges'))
			.map(x => x.innerText)
			.map(x => x.split('Total Cost: ')[1])
			.filter(x => x !== undefined)
			.map(x => parseInt(x))
	}
	const numberOfPoints = filteredBadges.reduce((a, b) => a + b, 0);

	if (document.querySelectorAll('.number_of_points')[index]) {
		document.querySelectorAll('.number_of_points')[index].innerHTML = `Total Cost: ${numberOfPoints}`;
	} else {
		const containerPoint = document.createElement('p');
		containerPoint.className = 'number_of_points';
		containerPoint.style.float = 'right';
		containerPoint.style.color = '#838c91';
		containerPoint.style.fontWeight = 500;
		containerPoint.style.fontSize = '14px';
		containerPoint.innerHTML = `Total Cost: ${numberOfPoints}`;
		document.querySelectorAll('.list-header')[index].append(containerPoint);
	}
};

if (document.querySelectorAll('.js-list-content').length > 0 && window.location.href.includes('trello')) {
	Object.keys(document.querySelectorAll('.js-list-content')).map((index) => {
		includeBadges(index);
	});
}

function receive(msg) {
	if (msg.txt === "execute" && window.location.href.includes('trello')) {
		Object.keys(document.querySelectorAll('.js-list-content')).map((index) => {
			includeBadges(index);
		});
	}
}