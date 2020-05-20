const { attributes } = require('structure');

const House = attributes({
  ownershipStatus: {
    type: String,
    required: true,
    equal: ['owned', 'mortgaged'],
  },
})(class House {});

module.exports = House;
