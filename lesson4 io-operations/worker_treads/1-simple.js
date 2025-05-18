const { Worker, isMainThread, parentPort } = require('worker_threads');

if (isMainThread) {
	const worker = new Worker(__filename);
	worker.on('message', message => console.log(message));
	worker.postMessage('Hello from main thread');
} else {
	parentPort.on('message', message => {
		console.log(message);

		parentPort.postMessage('Hello from worker thread');
	});
}
