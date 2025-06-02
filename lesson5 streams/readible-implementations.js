const { Readable } = require('stream');
const users = [];
for (let i = 0; i < 10000; i++) {
	users.push({
		id: i,
		name: `User ${i}`,
		email: `user${i}@gmail.com`,
	});
}

class PartialRead extends Readable {
	constructor(users, chunkSize) {
		super();
		this.users = users;
		this.chunkSize = chunkSize;
		this.index = 0;
	}

	_read() {
		const timerId = setTimeout(() => {
			const chunk = this.users.slice(this.index, this.index + this.chunkSize);
			this.index += this.chunkSize;

			if (chunk.length > 0) {
				this.push(JSON.stringify(chunk));
			} else {
				this.push(null);
				clearTimeout(timerId);
				console.log('Stream ended');
			}
		}, 1000);
	}
}

const partialRead = new PartialRead(users, 10);

module.exports = {
	partialRead,
};
