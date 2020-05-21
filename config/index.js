const ENV = process.env.NODE_ENV || 'development';

module.exports = {
  env: ENV,
  web: {
    port: process.env.EXPRESS_PORT,
  },
};

