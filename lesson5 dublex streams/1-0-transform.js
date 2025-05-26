const { createReadStream, createWriteStream } = require('fs');
const { join } = require('path');
const { Transform } = require('stream');

class ReverseTransform extends Transform {
	_transform(chunk, encoding, callback) {
		// Convert the chunk to a string, reverse it, and push it to the readable side
		const reversed = chunk.toString().split('').reverse().join('');
		this.push(reversed);
		callback();
	}
}

const reverseStream = new ReverseTransform();

const readStream = createReadStream(join(__dirname, 'input.txt'));
const writeStream = createWriteStream(join(__dirname, 'output.txt'));

readStream.pipe(reverseStream).pipe(writeStream);
