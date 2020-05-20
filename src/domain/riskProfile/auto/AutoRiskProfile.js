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
      ? 'ineligible'
      : this.calculateRiskScore(userInfo.initialRiskScore);
  }
});

module.exports = AutoRiskProfile;
