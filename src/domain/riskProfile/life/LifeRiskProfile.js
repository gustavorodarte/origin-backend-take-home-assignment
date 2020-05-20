const { attributes } = require('structure');
const RiskProfileService = require('../RiskProfileService');
const { pipe } = require('ramda');

const LifeRiskProfile = attributes(
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
)(class LifeRiskProfile {
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
      this.addHasDependents,
      this.addIsMarried,
    )(initialRisk);
  }
  get riskScore() {
    const userInfo = this.userPersonalInformation;
    return !this.isUnder60Years
      ? null
      : this.calculateRiskScore(userInfo.initialRiskScore);
  }

  get finalScore() {
    return this.getFinalScore(this.riskScore);
  }
});

module.exports = LifeRiskProfile;
