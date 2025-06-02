const fs = require('fs');
const path = require('path');
const readableStream = fs.createReadStream(path.join(__dirname, 'big.txt'));

readableStream.pause();

process.stdin.on('data', () => {
	const chunk = readableStream.read(64);
	if (chunk) {
		console.log(`Read ${chunk.length} bytes:`, chunk.toString());
	} else {
		console.log('No more data to read at the moment');
	}
});

readableStream.on('end', () => {
	console.log('End of stream');
	process.exit(0);
});

console.log('Press enter to read 64 bytes');
