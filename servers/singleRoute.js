'use strict';

const http = require('http');

const parseUrl = (url, numb) => {
  const dirs = url.split('/');
  return dirs[1];
};

const createServer = () => {
  const routers = new Map();

  const server = http.createServer(async (req, res) => {
    const router = routers.get(parseUrl(req.url));
    if (router === undefined) {
      res.statusCode = 404;
      res.end('url not found');
      return;
    } else {
      try {
        const { statusCode, response } = await router({ req, res });
        res.statusCode = statusCode;
        res.end(response);
      } catch (e) {
        console.log(e);
        res.statusCode = 500;
        res.end('internal server error');
      }
    }
  });
  server.on('error', (err) => {
    console.error('Server error. Server will be stoped');
    console.error(err);
    server.close();
  })
  const fn = () => {};
  fn.listen = (port, address) => {
    server.listen(port, address);
  };
  fn.router = (name, value) => {
    routers.set(name, value);
    return fn;
  };
  fn.close = () => {
    server.close();
  };
  return fn;
};

module.exports = createServer;
