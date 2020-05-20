const { attributes } = require('structure');

const Vehicle = attributes({
  year: {
    type: Number,
    required: true,
  },
})(class Vehicle {});

module.exports = Vehicle;
