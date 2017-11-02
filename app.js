'use strict';

const RPC = require('./RPC');
const route = require('./lib/route');
const load = require('./lib/load');

module.exports = app => {
  app.config.coreMiddleware.unshift('rpcMiddleware');
  app.RPC = RPC;

  route(app);
  load(app);
};
