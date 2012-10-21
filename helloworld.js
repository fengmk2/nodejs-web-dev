var http = require('http');
http.createServer(function (req, res) {
  console.log('%s %s : %j', req.method, req.url, req.headers);
  req.on('end', function () {
    res.writeHeader(200, { 'Content-Type': 'text/html' });
    res.end('Hello Alibaba.');
  });
}).listen(1984);