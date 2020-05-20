const LifeRiskProfile = require('src/domain/riskProfile/life/LifeRiskProfile');

describe('Domain :: LifeRiskProfile', () => {
  describe('#riskScore', () => {
    describe('when user is ineligible', () => {
      describe('when has age over 60 years ', () => {
        test('returns "ineligible"', () => {
          const lifeRiskProfile = new LifeRiskProfile({
            userPersonalInformation: {
              age: 70,
              dependents: 2,
              house: { ownership_status: 'owned' },
              income: 50000,
              maritalStatus: 'married',
              riskAnswers: [0, 1, 0],
              vehicle: { year: 2018 },
            },
          });
          lifeRiskProfile.init();
          expect(lifeRiskProfile.riskScore).toBe('ineligible');
        });
      });
    });
    describe('when user is eligible', () => {
      test('returns a correct riskScore value', () => {
        const lifeRiskProfile = new LifeRiskProfile({
          userPersonalInformation: {
            age: 35,
            dependents: 2,
            house: { ownership_status: 'owned' },
            income: 1000,
            maritalStatus: 'married',
            riskAnswers: [0, 1, 0],
            vehicle: { year: 2018 },
          },
        });
        lifeRiskProfile.init();
        expect(lifeRiskProfile.riskScore).toBe(2);
      });
    });
  });
});

