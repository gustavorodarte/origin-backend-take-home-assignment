const RiskProfileSerializer = require('src/interfaces/http/riskProfile/RiskProfileSerializer');
const UserPersonalInformation = require('src/domain/userInfo/UserPersonalInformation');
const AutoRiskProfile = require('src/domain/riskProfile/auto/AutoRiskProfile');
const HomeRiskProfile = require('src/domain/riskProfile/home/HomeRiskProfile');
const LifeRiskProfile = require('src/domain/riskProfile/life/LifeRiskProfile');
const DisabilityRiskProfile = require('src/domain/riskProfile/disability/DisabilityRiskProfile');


describe('Interfaces :: HTTP :: RiskProfile :: RiskProfileSerializer', () => {
  test('returns auto, home, life, and disability final score', () => {
    const serializedRiskProfile = RiskProfileSerializer.serialize({
      auto: {
        finalScore: 'regular',
      },
      disability: {
        finalScore: 'ineligible',
      },
      home: {
        finalScore: 'economic',
      },
      life: {
        finalScore: 'regular',
      },
    });

    expect(serializedRiskProfile).toEqual({
      auto: 'regular',
      disability: 'ineligible',
      home: 'economic',
      life: 'regular',
    });
  });

  test('ignores extra attributes', () => {
    const serializedRiskProfile = RiskProfileSerializer.serialize({
      auto: {
        finalScore: 'regular',
      },
      disability: {
        finalScore: 'ineligible',
      },
      home: {
        finalScore: 'economic',
      },
      life: {
        finalScore: 'regular',
      },
      unknown: 'Hello!',
    });

    expect(serializedRiskProfile).toEqual({
      auto: 'regular',
      disability: 'ineligible',
      home: 'economic',
      life: 'regular',
    });
  });

  test('is able to serialize auto, home, life, and disability entities instances', () => {
    const userPersonalInformation = new UserPersonalInformation({
      age: 35,
      dependents: 2,
      house: { ownershipStatus: 'owned' },
      income: 0,
      maritalStatus: 'married',
      riskAnswers: [0, 1, 0],
      vehicle: { year: 2018 },
    });

    const auto = new AutoRiskProfile({ userPersonalInformation });
    auto.init();
    const disability = new DisabilityRiskProfile({ userPersonalInformation });
    disability.init();
    const home = new HomeRiskProfile({ userPersonalInformation });
    home.init();
    const life = new LifeRiskProfile({ userPersonalInformation });
    life.init();

    const serializedRiskProfile = RiskProfileSerializer.serialize({
      auto,
      disability,
      home,
      life,
    });

    expect(serializedRiskProfile).toEqual({
      auto: 'regular',
      disability: 'ineligible',
      home: 'economic',
      life: 'regular',
    });
  });
});
