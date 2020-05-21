const request = require('specs/support/request');

describe('API :: POST :: /api/risk-profile', () => {
  describe('When pass the correct payload', () => {
    test('return success with correct risk calculation', async () => {
      const { body } = await request()
        .post('/api/risk-profile')
        .send({
          age: 35,
          dependents: 2,
          house: { ownership_status: 'owned' },
          income: 0,
          marital_status: 'married',
          risk_questions: [0, 1, 0],
          vehicle: { year: 2018 },
        })
        .expect('200');

      expect(body).toEqual({
        auto: 'regular',
        disability: 'ineligible',
        home: 'economic',
        life: 'regular',
      });
    });
  });
});
