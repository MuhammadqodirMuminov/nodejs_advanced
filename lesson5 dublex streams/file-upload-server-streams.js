const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
	try {
		if (req.method === 'POST' && req.url === '/upload') {
			const fileName = path.join(
				__dirname,
				'uploads',
				`upload-${Date.now()}.file`,
			);

			const fileStream = fs.createWriteStream(fileName);

			fileStream.on('error', (err) => {
				console.error('Error writing to file:', err);
				res.writeHead(500, { 'Content-Type': 'text/plain' });
				res.end('Internal Server Error');
			});

			let uploadedBytes = 0;
			req.on('data', (chunk) => {
				uploadedBytes += chunk.length;
				console.log(`Received ${uploadedBytes} bytes`);
			});

			req.pipe(fileStream);

			fileStream.on('finish', () => {
				res.statusCode = 200;
				res.setHeader('Content-Type', 'application/json');
				res.end(
					JSON.stringify({
						success: true,
						filename: path.basename(fileName),
						size: uploadedBytes,
					}),
				);
			});

			req.on('error', (err) => {
				console.error('Request error:', err);
				fileStream.destroy(err);
			});

			req.on('aborted', () => {
				fileStream.destroy();
				fs.unlink(fileName, () => {});
			});
		}
	} catch (error) {
		console.error('Error processing request:', error);
		res.writeHead(500, { 'Content-Type': 'text/plain' });
		res.end('Internal Server Error');
		return;
	}
});

const uploadDir = path.join(__dirname, 'uploads');

if (!fs.existsSync(uploadDir)) {
	fs.mkdirSync(uploadDir);
}

server.listen(3000, () => {
	console.log('Server is listening on port 3000');
});
