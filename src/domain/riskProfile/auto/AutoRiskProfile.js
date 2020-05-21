const { attributes } = require('structure');
const RiskProfileService = require('../RiskProfileService');
const { pipe } = require('ramda');

const AutoRiskProfile = attributes(
  {
    userPersonalInformation: {
      type: 'UserPersonalInformation',
      required: true,
    },
  },
  {
    dynamics: {
      UserPersonalInformation: () =>
        require('../../userInfo/UserPersonalInformation'),
      House: () =>
        require('../../userInfo/House'),
      Vehicle: () =>
        require('../../userInfo/Vehicle'),
    },
  },
)(class AutoRiskProfile {
  init() {
    const {
      values,
      functions,
    } = RiskProfileService(this.userPersonalInformation);

    Object.assign(this, { ...values, ...functions });
  }
  calculateRiskScore(initialRisk) {
    return pipe(
      this.deductionByAge,
      this.deductIncomeOver200k,
      this.addIsNewVehicle,
    )(initialRisk);
  }
  get riskScore() {
    const userInfo = this.userPersonalInformation;
    return !this.hasVehicle
      ? null
      : this.calculateRiskScore(userInfo.initialRiskScore);
  }

  get finalScore() {
    return this.getFinalScore(this.riskScore);
  }
});

module.exports = AutoRiskProfile;
