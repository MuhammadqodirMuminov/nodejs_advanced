const fs = require('fs');

fs.readFile('a.txt', () => {
	console.log('file Read');
	setTimeout(() => console.log('SetTimeOut'), 0);
	setImmediate(() => console.log('Immediate'));
});
