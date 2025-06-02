const { Transform, pipeline } = require('stream');
const { createReadStream, createWriteStream } = require('fs');
const { join } = require('path');
const { createGzip } = require('zlib');

class UpperCaseTransform extends Transform {
	_transform(chunk, encoding, callback) {
		const upperCased = chunk.toString().toUpperCase();

		this.push(upperCased);
		callback();
	}
}

const upperCaseStream = new UpperCaseTransform();

const readStream = createReadStream(join(__dirname, 'input.txt'));
const writeStream = createWriteStream(join(__dirname, 'output.txt.gz'));
const gzipStream = createGzip();

pipeline(readStream, upperCaseStream, gzipStream, writeStream, (err) => {
	if (err) {
		console.error('Pipeline failed:', err);
	} else {
		console.log('Pipeline processing completed');
	}
});
