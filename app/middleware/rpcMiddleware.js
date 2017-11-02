'use strict';

const rpcErrorCode = require('../../lib/rpc_error_code');
const constant = require('../../lib/constant');

module.exports = () => {
  return function* (next) { 
    if (this.request.url !== constant.RPC_URL) {
      yield next;
    } else {
      try {
        yield next;
      } catch (err) {
        if (err.name === 'RPC_EXCEPTION_ERROR') {
          return;
        }

        let error;
        if (err.name === 'SyntaxError') {
          error = rpcErrorCode.ParseError;
        } else {
          error = rpcErrorCode.InternalError;
        }

        this.rpc.throw(err, error.code, error.message);
      }
    }
  };
};
