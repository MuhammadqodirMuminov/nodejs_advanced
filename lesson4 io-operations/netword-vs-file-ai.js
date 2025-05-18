const { performance } = require('perf_hooks');
const https = require('https');
const fs = require('fs');

// process.env.UV_THREADPOOL_SIZE = 4;

const start = performance.now();
const timings = new Map();
const MAX_CALLS = 16;

for (let i = 0; i < MAX_CALLS; i++) {
	// netword i/o operation

	// https.request('https://api.huquqmaktabi.uz/users/666691064658157dad059636', res => {
	// 	res.on('data', () => {});
	// 	res.on('end', () => {
	// 		timings.set(`Request: ${i + 1}`, performance.now() - start);
	// 	});
	// }).end();

	// file io operation

	fs.readFile(__filename, () => {
		timings.set(`Read ${i + 1}`, performance.now() - start);
	});
}

process.on('beforeExit', () => console.log(timings));
