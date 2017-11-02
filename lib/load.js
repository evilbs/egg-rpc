'use strict';

const path = require('path');
const is = require('is-type-of');

function load(app) {
  const dir = path.join(app.config.baseDir, 'app/rpc');

  app.loader.loadToApp(dir, 'rpc', {
    caseStyle: 'lower',
    initializer(obj) {
      if (is.function(obj) && !is.class(obj)) {
        obj = obj(app);
      }
      return wrapClass(obj);
    },
  });
}

function wrapClass(RPC) {
  const keys = Object.getOwnPropertyNames(RPC.prototype);
  const ret = {};
  for (const key of keys) {
    if (key === 'constructor') continue;
    if (key[0] === '_') continue;
    if (is.function(RPC.prototype[key])) {
      ret[key] = methodToMiddleware(RPC, key);
    }
  }
  return ret;

  function methodToMiddleware(RPC, key) {
    return function* (ctx) {
      const rpc = new RPC(ctx);
      const r = rpc[key].call(rpc, ctx.rpc.params);
      if (is.generator(r) || is.promise(r)) {
        yield r;
      }
    };
  }
}

module.exports = load;
