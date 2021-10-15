'use strict';

const { Server, Site } = require('http-server');
const logger = require('logger');
const { http, http2 } = require('./transports');

//Site
const routes = {
  route1: () => {},
  route2: () => {}
};

const siteOptions1 = { host: 'exampl.com' };
const siteOptions2 = { host: 'exampl2.com' };

const site1 = new Site()
  .options(siteOptions)
  .routes(routes)
  .log(logger);

const site2 = new Site()
  .options(siteOptions2)
  .routes(routes)
  .log(logger);

//Server
const server = new Server();
const options = {
  host: 'localhost',
  port: '8000',
  transport: http
};
const errors = () => {};

server.add(site1)
  .default(site2)
  .log(logger)
  .errors(errors)
  .start(options);

process.on('SIGINT', () => {
  server.stop();
});
