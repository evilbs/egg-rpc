'use strict';

const RpcContext = require('../../lib/rpc_context');
const RPC = Symbol('eggRpc#RPC');

module.exports = {
  get rpc() {
    if (this[RPC]) return this[RPC];
    this[RPC] = new RpcContext(this, this.request.body);
    return this[RPC];
  },
};
