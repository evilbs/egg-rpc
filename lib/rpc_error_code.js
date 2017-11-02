'use strict';

const rpcErrorCode = {
  ParseError: {
    code: -32700,
    message: 'Parse error',
  },
  InvalidRequest: {
    code: -32600,
    message: 'Invalid Request',
  },
  MethodNotFound: {
    code: -32601,
    message: 'Method not found',
  },
  InvalidParams: {
    code: -32602,
    message: 'Invalid params',
  },
  InternalError: {
    code: -32603,
    message: 'Internal error',
  },
  MustGeneratorFun: {
    code: -32001,
    message: 'rpc function must be a generator function.',
  },
};

module.exports = rpcErrorCode;
