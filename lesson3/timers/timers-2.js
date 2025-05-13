const start = Date.now();

const timerCb = () => {
	console.log(Date.now() - start);
};

setTimeout(timerCb, 10);
setTimeout(timerCb, 10);
setTimeout(timerCb, 10);
setTimeout(timerCb, 10);
setTimeout(timerCb, 10);

