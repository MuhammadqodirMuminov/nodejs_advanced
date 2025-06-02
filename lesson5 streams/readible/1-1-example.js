const { Readable } = require('stream');

class CounterStream extends Readable {
	constructor(max) {
		super();
		this.max = max;
		this.counter = 0;
	}

	_read() {
		this.counter += 1;

		if (this.counter <= this.max) {
			const str = `${this.counter}\n`;
			this.push(str);
		} else {
			this.push(null);
		}
	}
}

const counterStream = new CounterStream(10);

counterStream.on('data', chunk => {
	console.log(chunk.toString());
});

counterStream.on('end', () => {
	console.log('Counter stream finished');
});
