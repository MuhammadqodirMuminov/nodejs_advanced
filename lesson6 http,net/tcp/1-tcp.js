const net = require('net');

const server = net.createServer((socket) => {
	socket.write('Hello, client!\n');

	socket.on('data', (data) => {
		console.log(`Received data: ${data}`);

		socket.write('Hello from the server!\n');
	});

	socket.on('end', () => {
		console.log('Client disconnected.');
	});
});

server.listen(3000, () => {
	console.log('TCP server listening on port 3000');
});
