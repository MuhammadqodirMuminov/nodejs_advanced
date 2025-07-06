// give me example for spawn

const { spawn } = require('child_process');

const child = spawn('ls', ['-la']);

child.stdout.on('data', (data) => {
	console.log(`Stdout: ${data}`);
});

child.stderr.on('data', (data) => {
	console.error(`Stderr: ${data}`);
});

child.on('close', (code) => {
	console.log(`Child process exited with code ${code}`);
});
