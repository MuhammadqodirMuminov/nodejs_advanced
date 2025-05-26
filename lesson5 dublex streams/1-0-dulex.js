const { Duplex } = require('stream');

class NumberDuplex extends Duplex {
	constructor(options) {
		super(options);
		this.current = 0;
		this.max = 5;
		this.received = [];
	}

	_write(chunk, encoding, callback) {
		this.received.push(chunk.toString().trim());
		callback();
	}

	_read() {
		this.current++;
		if (this.current <= this.max) {
			this.push(`${this.current}\n`);
		} else {
			this.push(null);
		}
	}

	_final(callback) {
		console.log('Received messages:', this.received);
		callback();
	}
}

const duplexStream = new NumberDuplex();

duplexStream.on('data', (data) => {
	console.log(`Sent: ${data.toString().trim()}`);
});

duplexStream.on('end', () => {
	console.log('Stream ended.');
});

duplexStream.write('a');
duplexStream.write('b');
duplexStream.write('d');
duplexStream.write('e');
duplexStream.write('f');
duplexStream.write('g');
duplexStream.write('h');
duplexStream.end();
