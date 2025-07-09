process.on('uncaughtException', (error) => {
	console.error('Uncaught Exception:', error.message);
});

throw new Error('Something went wrong');
