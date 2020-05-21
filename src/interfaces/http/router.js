const { Router } = require('express');
const statusMonitor = require('express-status-monitor');
const cors = require('cors');
const bodyParser = require('body-parser');
const compression = require('compression');
const methodOverride = require('method-override');
const controller = require('./utils/createControllerRoutes');

module.exports = ({
  config, containerMiddleware, loggerMiddleware, errorHandler, swaggerMiddleware,
}) => {
  const router = Router();

  if (config.env === 'development') {
    router.use(statusMonitor());
  }
  if (config.env !== 'test') {
    router.use(loggerMiddleware);
  }

  const apiRouter = Router();

  apiRouter
    .use(methodOverride('X-HTTP-Method-Override'))
    .use(cors())
    .use(bodyParser.json())
    .use(compression())
    .use(containerMiddleware)
    .use('/docs', swaggerMiddleware);

  /*
   * Add your API routes here
   *
   * You can use the `controllers` helper like this:
   * apiRouter.use('/users', controller(controllerPath))
   *
   * The `controllerPath` is relative to the `interfaces/http` folder
   */

  apiRouter.use('/status', (_, res) => res.json({ message: 'Hello! I am here.' }));

  apiRouter.use('/risk-profile', controller('riskProfile/RiskProfileController'));

  router.use('/api', apiRouter);

  router.use(errorHandler);

  return router;
};
