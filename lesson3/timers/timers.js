console.log('start');
setTimeout(() => {
	console.log('setTimeOut');
	console.log('end');

	setTimeout(() => {
		console.log('Inner Time Out');
	}, 1000);
}, 1000);
