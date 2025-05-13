const fs = require('fs');

fs.readFile('a.txt', () => {
	console.log('Read file');
});

setTimeout(() => {
	console.log('setTimeOut');
}, 1);

setTimeout(() => {
	console.log('setTimeOut');
}, 1);
