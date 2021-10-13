'use strict';

const server = require('server');
const logger = require('logger');


const bots = {
  bot1: () => {},
  bot2: () => {}
};

const options = { host: 'localhost', port: '8000' };
const errors = () => {};

server.routs(bots)
  .log(logger)
  .errors(errors)
  .start(options);

process.on('SIGINT', () => {
  server.stop();
});
