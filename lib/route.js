'use strict';

const constant = require('./constant');
const dispatch = require('./dispatch');

function route(app) {
  app.beforeStart(function* () {
    app.post(constant.RPC_URL, dispatch);
  });
}

module.exports = route;
