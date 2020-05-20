const { attributes } = require('structure');

const UserPersonalInformation = attributes(
  {
    age: {
      type: Number,
      required: true,
      min: 0,
    },
    dependents: {
      type: Number,
      required: true,
      min: 0,
    },
    income: {
      type: Number,
      required: true,
    },
    maritalStatus: {
      type: String,
      required: true,
      equal: ['single', 'married'],
    },
    riskAnswers: {
      type: Array,
      required: true,
      itemType: Boolean,
      sparse: false,
      exactLength: 3,
    },
    house: {
      type: 'House',
    },
    vehicle: {
      type: 'Vehicle',
    },
  },
  {
    dynamics: {
      House: () => require('./House'),
      Vehicle: () => require('./Vehicle'),
    },
  },
)(class UserPersonalInformation {
  get initialRiskScore() {
    return this.riskAnswers.reduce((acc, curr) => (curr ? acc + 1 : acc), 0);
  }
});

module.exports = UserPersonalInformation;
