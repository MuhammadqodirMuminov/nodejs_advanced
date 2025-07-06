const { execFile } = require('child_process');

execFile('./a.out', (error, stdout, stderr) => {
	if (error) {
		console.error(`Error: ${error}`);
		return;
	}
	if (stderr) {
		console.error(`Stderr: ${stderr}`);
		return;
	}
	console.log(`Stdout: ${stdout}`);
});
