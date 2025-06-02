const { Writable } = require('stream');
const { partialRead } = require('../readible-implementations');

class UppercaseWriter extends Writable {
	constructor(options) {
		// Calls the stream.Writable() constructor
		super(options);
	}

	_write(chunk, encoding, callback) {
		// Convert the chunk to uppercase
		const uppercase = chunk.toString().toUpperCase();

		// Print to the console
		process.stdout.write(uppercase);

		// Call callback to indicate we're ready for the next chunk
		callback();
	}
}

// Create an instance of our custom stream
const uppercaseWriter = new UppercaseWriter();

// Write data to it
// uppercaseWriter.write('Hello, ');
// uppercaseWriter.write('world!\n');
// uppercaseWriter.write('This text will be uppercase.\n');
// uppercaseWriter.end();

// uppercaseWriter.on('finish', () => {
// 	console.log('All data has been processed');
// });

partialRead.pipe(uppercaseWriter);
