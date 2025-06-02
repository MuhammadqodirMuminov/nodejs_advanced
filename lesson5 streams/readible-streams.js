const { Readable } = require('stream');

class NumberStream extends Readable {
	constructor(max, options) {
		super(options);
		this.index = 1;
		this.max = max;
	}

	_read(size) {
		const i = this.index++;
		if (i > this.max) {
			this.push(null);
		} else {
			const chunk = Buffer.from(String(i));
			this.push(chunk);
		}
	}
}

const numberStream = new NumberStream(10);
numberStream.on('data', chunk => {
	console.log(`Received chunk: ${chunk}`);
});
numberStream.on('end', () => {
	console.log('No more data to read.');
});
