const RiskProfileSerializer = {
  serialize({
    auto,
    disability,
    home,
    life,
  }) {
    return {
      auto: auto.finalScore,
      disability: disability.finalScore,
      home: home.finalScore,
      life: life.finalScore,
    };
  },
};

module.exports = RiskProfileSerializer;
