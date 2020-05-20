const AutoRiskProfile = require('src/domain/riskProfile/auto/AutoRiskProfile');

describe('Domain :: AutoRiskProfile', () => {
  describe('#riskScore', () => {
    describe('when user is ineligible', () => {
      describe('when has no vehicle', () => {
        test('returns "ineligible"', () => {
          const autoRiskProfile = new AutoRiskProfile({
            userPersonalInformation: {
              age: 35,
              dependents: 2,
              income: 0,
              maritalStatus: 'married',
              riskAnswers: [0, 1, 0],
            },
          });
          autoRiskProfile.init();
          expect(autoRiskProfile.riskScore).toBe('ineligible');
        });
      });
    });
    describe('when user is eligible', () => {
      test('returns a correct riskScore value', () => {
        const autoRiskProfile = new AutoRiskProfile({
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
        autoRiskProfile.init();
        expect(autoRiskProfile.riskScore).toBe(1);
      });
    });
  });
});

