const http = require('http');
const { partialRead } = require('./readible-implementations');

const server = http.createServer((req, res) => {
	res.setHeader('Content-Type', 'octet-stream');
	res.setHeader('Transfer-Encoding', 'chunked');

	partialRead.on('data', chunk => {
		res.write(chunk);
	});
	partialRead.on('end', () => {
		res.end();
	});
});
server.listen(3000, () => {
	console.log('Server is running on port 3000');
});
