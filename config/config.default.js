'use strict';

module.exports = () => {
  const config = {};

  config.security = {
    csrf: {
      ignoreJSON: true,
    },
  };

  return config;
};
