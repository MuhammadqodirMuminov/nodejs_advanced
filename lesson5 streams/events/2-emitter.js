const EventEmitter = require('node:events');

class GuessNumber extends EventEmitter {
	constructor(targetNumber) {
		super();
		this.targetNumber = targetNumber;
	}

	run() {
		let iterations = 0;
		const timerId = setInterval(() => {
			this.emit('data');
			const num = Math.floor(Math.random() * 100);
			iterations++;
			if (num === this.targetNumber) {
				this.emit('numberFound', num, iterations);
				clearInterval(timerId);
			}
		}, 100);
	}
}

const guessNum = new GuessNumber(42);
guessNum.on('data', (num, iterations) => {
	console.log('Guessing number...', num);
	console.log('Iterations:', iterations);
});
guessNum.run();
