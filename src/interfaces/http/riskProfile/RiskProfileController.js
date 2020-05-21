const { Router } = require('express');
const { inject } = require('awilix-express');
const Status = require('http-status');

const UsersController = {
  get router() {
    const router = Router();

    router.use(inject('riskProfileSerializer'));
    router.post('/', inject('calculateRisk'), this.index);

    return router;
  },

  index(req, res, next) {
    const { calculateRisk, riskProfileSerializer } = req;

    const { SUCCESS, VALIDATION_ERROR, ERROR } = calculateRisk.outputs;
    calculateRisk
      .on(SUCCESS, (riskProfile) => {
        res
          .status(Status.OK)
          .json(riskProfileSerializer.serialize(riskProfile));
      })
      .on(VALIDATION_ERROR, (error) => {
        res.status(Status.BAD_REQUEST).json({
          type: 'ValidationError',
          details: error.details,
        });
      })
      .on(ERROR, next);

    calculateRisk.execute(req.body);
  },
};

module.exports = UsersController;
