const Operation = require('src/app/Operation');
const UserPersonalInformation = require('src/domain/insurances/UserPersonalInformation');

class CalculateRisk extends Operation {
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super();
  }
  async execute({
    age,
    dependents,
    income,
    marital_status: maritalStatus,
    risk_questions: riskAnswers,
    house,
    vehicle,
  }) {
    const { SUCCESS, ERROR } = this.outputs;
    try {
      const userPersonalInformation = new UserPersonalInformation({
        age,
        dependents,
        income,
        maritalStatus,
        riskAnswers,
        house,
        vehicle,
      });

      

      this.emit(SUCCESS, userPersonalInformation);
    } catch (error) {
      this.emit(ERROR, error);
    }
  }
}

CalculateRisk.setOutputs(['SUCCESS', 'ERROR']);
module.exports = CalculateRisk;
