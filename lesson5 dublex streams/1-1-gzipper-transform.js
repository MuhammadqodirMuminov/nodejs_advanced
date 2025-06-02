const { createReadStream, createWriteStream } = require('fs');
const { join } = require('path');
const { Transform } = require('stream');
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

const gzipStream = new createGzip();

readStream.pipe(upperCaseStream).pipe(gzipStream).pipe(writeStream);

writeStream.on('finish', () => {
	console.log('Pipeline processing completed');
});
