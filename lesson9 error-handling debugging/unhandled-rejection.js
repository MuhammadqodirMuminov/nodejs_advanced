Promise.reject(new Error('Unhandled Reject'));

process.on('unhandledRejection', (error) => {
	console.error('Unhandled Rejection:', error.message);
});
