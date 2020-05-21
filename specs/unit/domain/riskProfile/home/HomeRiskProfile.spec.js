const HomeRiskProfile = require('src/domain/riskProfile/home/HomeRiskProfile');

describe('Domain :: HomeRiskProfile', () => {
  describe('#riskScore', () => {
    describe('when user is ineligible', () => {
      describe('when has no house', () => {
        test('returns "ineligible"', () => {
          const homeRiskProfile = new HomeRiskProfile({
            userPersonalInformation: {
              age: 35,
              dependents: 2,
              income: 0,
              maritalStatus: 'married',
              riskAnswers: [0, 1, 0],
              vehicle: { year: 2018 },
            },
          });
          homeRiskProfile.init();
          expect(homeRiskProfile.riskScore).toBe(null);
        });
      });
    });
    describe('when user is eligible', () => {
      test('returns a correct riskScore value', () => {
        const homeRiskProfile = new HomeRiskProfile({
          userPersonalInformation: {
            age: 35,
            dependents: 2,
            house: { ownership_status: 'owned' },
            income: 0,
            maritalStatus: 'married',
            riskAnswers: [0, 1, 0],
            vehicle: { year: 2018 },
          },
        });
        homeRiskProfile.init();
        expect(homeRiskProfile.riskScore).toBe(0);
      });
    });
  });
});

