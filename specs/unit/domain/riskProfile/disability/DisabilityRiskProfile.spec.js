const DisabilityRiskProfile = require('src/domain/riskProfile/disability/DisabilityRiskProfile');

describe('Domain :: DisabilityRiskProfile', () => {
  describe('#riskScore', () => {
    describe('when user is ineligible', () => {
      describe('when has no income', () => {
        test('returns "ineligible"', () => {
          const disabilityRiskProfile = new DisabilityRiskProfile({
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
          disabilityRiskProfile.init();
          expect(disabilityRiskProfile.riskScore).toBe('ineligible');
        });
      });
      describe('when has age over 60 years ', () => {
        test('returns "ineligible"', () => {
          const disabilityRiskProfile = new DisabilityRiskProfile({
            userPersonalInformation: {
              age: 600,
              dependents: 2,
              house: { ownership_status: 'owned' },
              income: 50000,
              maritalStatus: 'married',
              riskAnswers: [0, 1, 0],
              vehicle: { year: 2018 },
            },
          });
          disabilityRiskProfile.init();
          expect(disabilityRiskProfile.riskScore).toBe('ineligible');
        });
      });
    });
    describe('when user is eligible', () => {
      test('returns a correct riskScore value', () => {
        const disabilityRiskProfile = new DisabilityRiskProfile({
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
        disabilityRiskProfile.init();
        expect(disabilityRiskProfile.riskScore).toBe(0);
      });
    });
  });
});

