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
    risk_answers: {
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
      House: () => require('../house/House'),
      Vehicle: () => require('../Vehicle/vehicle'),
    },
  },
)(class UserPersonalInformation {});

module.exports = UserPersonalInformation;
