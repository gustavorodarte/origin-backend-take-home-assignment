const { attributes } = require('structure');
const RiskProfileService = require('../RiskProfileService');
const { pipe } = require('ramda');

const HomeRiskProfile = attributes(
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
)(class HomeRiskProfile {
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
      this.addHouseIsMortgaged,
    )(initialRisk);
  }
  get riskScore() {
    const userInfo = this.userPersonalInformation;
    return !this.hasHome
      ? 'ineligible'
      : this.calculateRiskScore(userInfo.initialRiskScore);
  }
});

module.exports = HomeRiskProfile;
