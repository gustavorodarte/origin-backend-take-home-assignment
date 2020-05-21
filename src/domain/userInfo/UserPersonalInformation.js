const { attributes } = require('structure');


/*
Vehicle and House schemas need to be in the same file because
the following issue in structure:
  https://github.com/talyssonoc/structure/issues/132
*/

const Vehicle = attributes({
  year: {
    type: Number,
    required: true,
  },
})(class Vehicle {});


const House = attributes({
  ownershipStatus: {
    type: String,
    required: true,
    equal: ['owned', 'mortgaged'],
  },
})(class House {});


const UserPersonalInformation = attributes({
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
  house: House,
  vehicle: Vehicle,
})(class UserPersonalInformation {
  get initialRiskScore() {
    return this.riskAnswers.reduce((acc, curr) => (curr ? acc + 1 : acc), 0);
  }
});

module.exports = UserPersonalInformation;
