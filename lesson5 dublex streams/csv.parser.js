const { Transform } = require('stream');
const fs = require('fs');

class CSVParser extends Transform {
	constructor(options = {}) {
		options.objectMode = true;
		super(options);
		this.headers = null;
		this.buffer = '';
		this.delimiter = options.delimiter || ',';
	}

	_transform(chunk, encoding, callback) {
		// Add new data to the buffer
		this.buffer += chunk.toString();

		const lines = this.buffer.split('\n');

		this.buffer = lines.pop();

		// Process lines
		for (const line of lines) {
			if (line.trim() === '') continue;

			const values = this._parseLine(line);

			if (!this.headers) {
				this.headers = values;
				continue;
			}

			const record = {};
			for (let i = 0; i < this.headers.length; i++) {
				record[this.headers[i]] = values[i];
			}

			this.push(record);
		}

		callback();
	}

	_flush(callback) {
		if (this.buffer.trim() !== '') {
			const values = this._parseLine(this.buffer);

			if (this.headers) {
				const record = {};
				for (let i = 0; i < this.headers.length; i++) {
					record[this.headers[i]] = values[i];
				}
				this.push(record);
			}
		}

		callback();
	}

	_parseLine(line) {
		return line.split(this.delimiter).map((field) => field.trim());
	}
}

const parser = new CSVParser();
const readStream = fs.createReadStream('data.csv');

readStream.pipe(parser);

parser.on('data', (record) => {
	console.log(record);
});

parser.on('end', () => {
	console.log('CSV parsing complete');
});
