console.log('Start');

Promise.resolve().then(_ => {
	console.log('Promise');
});

process.nextTick(() => {
	console.log('nextTick');
});
console.log('End');
