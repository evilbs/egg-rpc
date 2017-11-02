class RPC {
  constructor(ctx) {
    this.ctx = ctx;
    this.app = ctx.app;
    this.service = ctx.service;
    this.config = this.app.config;
  }

  success(result) {
    this.ctx.rpc.success(result);
  }

  fail(code, message, data) {
    this.ctx.rpc.fail(code, message, data);
  }

  throw(err, code, message) {
    this.ctx.rpc.throw(err, code, message);
  }
}

module.exports = RPC;
