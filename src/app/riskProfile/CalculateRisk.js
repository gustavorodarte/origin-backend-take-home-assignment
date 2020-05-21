const Operation = require('src/app/Operation');
const UserPersonalInformation = require('src/domain/userInfo/UserPersonalInformation');
const AutoRiskProfile = require('src/domain/riskProfile/auto/AutoRiskProfile');
const HomeRiskProfile = require('src/domain/riskProfile/home/HomeRiskProfile');
const LifeRiskProfile = require('src/domain/riskProfile/life/LifeRiskProfile');
const DisabilityRiskProfile = require('src/domain/riskProfile/disability/DisabilityRiskProfile');

class CalculateRisk extends Operation {
  static initRiskProfilesDomains(userPersonalInformation) {
    const auto = AutoRiskProfile.buildStrict({ userPersonalInformation });
    auto.init();
    const disability = DisabilityRiskProfile.buildStrict({ userPersonalInformation });
    disability.init();
    const home = HomeRiskProfile.buildStrict({ userPersonalInformation });
    home.init();
    const life = LifeRiskProfile.buildStrict({ userPersonalInformation });
    life.init();
    return {
      auto,
      home,
      disability,
      life,
    };
  }
  async execute({
    age,
    dependents,
    income,
    marital_status: maritalStatus,
    risk_questions: riskAnswers,
    house: {
      ownership_status: ownershipStatus,
    } = {},
    vehicle,
  } = {}) {
    const { SUCCESS, ERROR, VALIDATION_ERROR } = this.outputs;
    try {
      const userPersonalInformation = UserPersonalInformation.buildStrict({
        age,
        dependents,
        income,
        maritalStatus,
        riskAnswers,
        house: {
          ownershipStatus,
        },
        vehicle,
      });

      return this.emit(SUCCESS, CalculateRisk.initRiskProfilesDomains(userPersonalInformation));
    } catch (error) {
      if (error.message === 'Invalid Attributes') {
        return this.emit(VALIDATION_ERROR, error);
      }
      return this.emit(ERROR, error);
    }
  }
}

CalculateRisk.setOutputs(['SUCCESS', 'ERROR', 'VALIDATION_ERROR']);
module.exports = CalculateRisk;
