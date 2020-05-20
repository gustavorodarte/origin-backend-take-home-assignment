const { attributes } = require('structure');
const RiskProfileService = require('../RiskProfileService');
const { pipe } = require('ramda');

const DisabilityRiskProfile = attributes(
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
)(class DisabilityRiskProfile {
  constructor() {
    const {
      values,
      functions,
    } = RiskProfileService(this.userPersonalInformation);

    Object.assign(this, { ...values, ...functions });
  }
  calculateRiskScore(initialRisk) {
    return pipe(
      this.deductUnder30Years,
      this.deductBetween30n40Years,
      this.deductIncomeOver200k,
      this.addHouseIsMortgaged,
      this.addHasDependents,
      this.deductIsMarried,
    )(initialRisk);
  }
  get riskScore() {
    const userInfo = this.userPersonalInformation;
    return !this.hasIncome(userInfo) || this.isUnder60Years(userInfo)
      ? 'ineligible'
      : this.calculateRiskScore(userInfo.initialRiskScore);
  }
});

module.exports = DisabilityRiskProfile;
