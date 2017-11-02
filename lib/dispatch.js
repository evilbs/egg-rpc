'use strict';

const rpcErrorCode = require('./rpc_error_code');
const is = require('is-type-of');

const dispatch = function* () {
  const ctx = this;
  const app = this.app;
  const request = this.rpc.request; 
  if (!request) {
    fail(rpcErrorCode.parseError);
    return;
  }

  if (!request.method || !is.string(request.method)) {
    fail(rpcErrorCode.InvalidRequest);
    return;
  }

  const methodPair = request.method.split('.');
  let rpcMethod;
  // RPC 方法名检查
  if (!methodPair || methodPair.length < 2
    || !(rpcMethod = findRpcMethod(app, methodPair))
  ) {
    fail(rpcErrorCode.MethodNotFound);
    return;
  }

  try {
    yield rpcMethod(this);
    if (!this.rpc.handled) {
      fail(rpcErrorCode.MustCallEndFun);
    }
  } catch (e) {
    const { code, message } = rpcErrorCode.InternalError;
    ctx.rpc.throw(e, code, message);
  }

  function fail({ code, message }) {
    ctx.rpc.fail(code, message);
  }
};

function findRpcMethod(app, methodPair) {
  let rpcClass;
  const rpcMethodName = methodPair[methodPair.length - 1];
  rpcClass = app.rpc;

  for (let i = 0; i < methodPair.length - 1; i++) {
    if (!rpcClass) {
      return null;
    }

    const name = methodPair[i];
    rpcClass = rpcClass[name];
  }

  if (rpcClass) {
    return rpcClass[rpcMethodName];
  }

  return null;
}

module.exports = dispatch;
