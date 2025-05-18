const notifications = new Array(1000).fill({
	id: 1,
	message: 'Happy Independans day',
	user_id: Math.floor(Math.random() * 1000),
});

function sendNotification(notification) {
	console.log('notification sent ' + JSON.stringify(notification));
}

let index = 0;

function processChunk() {
	const end = Math.min(index + 100, notifications.length);
	for (let i = index; i < end; i++) {
		sendNotification(notifications[i]);
	}
	index = end;

	if (index < notifications.length) {
		console.log('Immediate work!!!!!');
		setImmediate(processChunk);
	}
}

processChunk();
