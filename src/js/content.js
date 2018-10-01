chrome.runtime.onMessage.addListener(receive);

const array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

if (document.querySelectorAll('.js-list-content').length > 0 && window.location.href.includes('trello')) {
	array.map((index) => {
		if (document.querySelectorAll('.list-card:not(.hide)').length > 0) {
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

		const containerPoint = document.createElement('p');
		containerPoint.className = 'number_of_points';
		containerPoint.style.float = 'right';
		containerPoint.style.color = '#838c91';
		containerPoint.style.fontWeight = 500;
		containerPoint.style.fontSize = '14px';
		containerPoint.innerHTML = 'Total Cost: ' + numberOfPoints;

		document.querySelectorAll('.list-header')[index].append(containerPoint);
	});
}

function receive(msg) {
	if (msg.txt === "execute" && window.location.href.includes('trello')) {
		array.map((index) => {
			if (document.querySelectorAll('.list-card:not(.hide)').length > 0) {
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

			if (document.querySelectorAll('.number_of_points').length > 0) {
				document.querySelectorAll('.number_of_points')[index].innerHTML = 'Total Cost: ' + numberOfPoints;
			} else {
				const containerPoint = document.createElement('p');
				containerPoint.className = 'number_of_points';
				containerPoint.style.float = 'right';
				containerPoint.style.color = '#838c91';
				containerPoint.style.fontWeight = 500;
				containerPoint.style.fontSize = '14px';
				containerPoint.innerHTML = 'Total Cost: ' + numberOfPoints;

				document.querySelectorAll('.list-header')[index].append(containerPoint);
			}
		});
	}
}