'use strict';

class RpcContext {
  constructor(ctx, request) {
    this.ctx = ctx;
    this.app = ctx.app;
    this.response = { jsonrpc: '2.0' };
    if (!request) {
      return;
    }

    this.response.id = request.id;
    this.request = request;
    this.handled = false;
    Object.assign(this, request);
  }

  success(result) {
    this.response.result = result;
    this.ctx.body = this.response;
    this.handled = true;
  }

  fail(code, message, data) {
    this.response.error = {
      code, message, data
    };

    this.ctx.body = this.response;
    this.handled = true;
  }

  throw(err, code, message) {
    err.name = 'RPC_EXCEPTION_ERROR';
    this.app.emit('error', err, this.app);
    message += '\r\n' + err;
    this.fail(code, message, err);
  }
}

module.exports = RpcContext;
