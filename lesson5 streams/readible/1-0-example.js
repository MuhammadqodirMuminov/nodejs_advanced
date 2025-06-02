const fs = require('fs');
const path = require('path');

// Create a readable stream
const readableStream = fs.createReadStream(path.join(__dirname, 'big.txt'), {
	encoding: 'utf8',
	highWaterMark: 16 * 1024, // 16KB chunks
});

// Handle stream events
readableStream.on('data', chunk => {
	console.log(`Received ${chunk.length} characters`);
});

readableStream.on('end', () => {
	console.log('File reading completed');
});

readableStream.on('error', error => {
	console.error('Error reading file:', error);
});
