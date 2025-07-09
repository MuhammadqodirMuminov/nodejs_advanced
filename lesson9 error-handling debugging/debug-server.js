const http = require('http');

const server = http.createServer((req, res) => {
	debugger;
	console.log('Request received');
	res.end('Hello World\n');
});

server.listen(3000, () => {
	console.log('Server started on port 3000');
});
