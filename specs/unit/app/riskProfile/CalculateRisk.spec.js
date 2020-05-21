const CalculateRisk = require('src/app/riskProfile/CalculateRisk');

describe('App :: RiskProfile :: CalculateRisk', () => {
  describe('when input is valid', () => {
    test('calculates the risk and emits SUCCESS', (done) => {
      const calculateRisk = new CalculateRisk();

      const userInput = {
        age: 35,
        dependents: 2,
        house: { ownership_status: 'owned' },
        income: 0,
        marital_status: 'married',
        risk_questions: [0, 1, 0],
        vehicle: { year: 2018 },
      };

      calculateRisk.on(calculateRisk.outputs.SUCCESS, (response) => {
        expect(response.auto.finalScore).toBe('regular');
        expect(response.disability.finalScore).toBe('ineligible');
        expect(response.home.finalScore).toBe('economic');
        expect(response.life.finalScore).toBe('regular');
        done();
      });

      calculateRisk.execute(userInput);
    });
  });
  describe('when input is invalid', () => {
    test('emits VALIDATION_ERROR with the error', (done) => {
      const calculateRisk = new CalculateRisk();
      const userInput = {
        age: 35,
      };

      calculateRisk.on(calculateRisk.outputs.VALIDATION_ERROR, (response) => {
        expect(response.message).toBe('Invalid Attributes');
        done();
      });
      calculateRisk.execute(userInput);
    });
  });
});
