const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
 
  res.end('Hello World - Brisa');
  const fs = require("fs");
  fs.appendFileSync("file99.txt", " Sending More Aloha");
 

});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
