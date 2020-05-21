const {
  createContainer, asClass, asFunction, asValue,
} = require('awilix');
const { scopePerRequest } = require('awilix-express');

const Server = require('./interfaces/http/Server');
const router = require('./interfaces/http/router');
const loggerMiddleware = require('./interfaces/http/logging/loggerMiddleware');
const errorHandler = require('./interfaces/http/errors/errorHandler');
const devErrorHandler = require('./interfaces/http/errors/devErrorHandler');
const swaggerMiddleware = require('./interfaces/http/swagger/swaggerMiddleware');

const { logger } = require('./infra/logging/logger');
const config = require('../config');
const Application = require('./app/Application');

const {
  CalculateRisk,
} = require('./app/riskProfile');


const RiskProfileSerializer = require('./interfaces/http/riskProfile/RiskProfileSerializer');


const container = createContainer();

const { database } = require('./infra/database/models');


// System
container
  .register({
    app: asClass(Application).singleton(),
    server: asClass(Server).singleton(),
  })
  .register({
    router: asFunction(router).singleton(),
    logger: asValue(logger),
  })
  .register({
    config: asValue(config),
  });

// Middlewares
container
  .register({
    loggerMiddleware: asFunction(loggerMiddleware).singleton(),
  })
  .register({
    containerMiddleware: asValue(scopePerRequest(container)),
    errorHandler: asValue(config.production ? errorHandler : devErrorHandler),
    swaggerMiddleware: asValue([swaggerMiddleware]),
  });


// Database
container.register({
  database: asValue(database),
});


// Operations
container.register({
  calculateRisk: asClass(CalculateRisk),
});

// Serializers
container.register({
  riskProfileSerializer: asValue(RiskProfileSerializer),
});

module.exports = container;
