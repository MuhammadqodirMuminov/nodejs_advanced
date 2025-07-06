const { fork } = require('child_process');

const child = fork('child.js');

child.send('Hello from parent');

child.on('message', (message) => {
	console.log('Message from child:', message);
});

child.on('exit', () => {
	console.log('Child process exited');
});
