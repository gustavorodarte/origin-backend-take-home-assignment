const RiskProfileService = require('src/domain/riskProfile/RiskProfileService');
const { subYears, getYear } = require('date-fns');

describe('Domain :: RiskProfileService', () => {
  describe('#values', () => {
    describe('hasIncome', () => {
      describe('When hasIncome is true', () => {
        test('should return the correct condition value', () => {
          const userInfo = {
            income: 10000,
          };
          const { values: { hasIncome } } = RiskProfileService(userInfo);
          expect(hasIncome).toBeTruthy();
        });
      });
      describe('When hasIncome is false', () => {
        test('should return the correct condition value', () => {
          const userInfo = {
            income: 0,
          };
          const { values: { hasIncome } } = RiskProfileService(userInfo);
          expect(hasIncome).toBeFalsy();
        });
      });
    });
    describe('isUnder60Years', () => {
      describe('When isUnder60Years is true', () => {
        test('should return the correct condition value', () => {
          const userInfo = {
            age: 30,
          };
          const { values: { isUnder60Years } } = RiskProfileService(userInfo);
          expect(isUnder60Years).toBeTruthy();
        });
      });
      describe('When isUnder60Years is false', () => {
        test('should return the correct condition value', () => {
          const userInfo = {
            age: 70,
          };
          const { values: { isUnder60Years } } = RiskProfileService(userInfo);
          expect(isUnder60Years).toBeFalsy();
        });
      });
    });
    describe('isUnder30Years', () => {
      describe('When isUnder30Years is true', () => {
        test('should return the correct condition value', () => {
          const userInfo = {
            age: 29,
          };
          const { values: { isUnder30Years } } = RiskProfileService(userInfo);
          expect(isUnder30Years).toBeTruthy();
        });
      });
      describe('When isUnder30Years is false', () => {
        test('should return the correct condition value', () => {
          const userInfo = {
            age: 34,
          };
          const { values: { isUnder30Years } } = RiskProfileService(userInfo);
          expect(isUnder30Years).toBeFalsy();
        });
      });
    });
    describe('isBetween30n40Years', () => {
      describe('When isBetween30n40Years is true', () => {
        test('should return the correct condition value', () => {
          const userInfo = {
            age: 35,
          };
          const { values: { isBetween30n40Years } } = RiskProfileService(userInfo);
          expect(isBetween30n40Years).toBeTruthy();
        });
      });
      describe('When isBetween30n40Years is false', () => {
        test('should return the correct condition value', () => {
          const userInfo = {
            age: 45,
          };
          const { values: { isBetween30n40Years } } = RiskProfileService(userInfo);
          expect(isBetween30n40Years).toBeFalsy();
        });
      });
    });
    describe('hasIncomeOver200k', () => {
      describe('When hasIncomeOver200k is true', () => {
        test('should return the correct condition value', () => {
          const userInfo = {
            income: 2000000,
          };
          const { values: { hasIncomeOver200k } } = RiskProfileService(userInfo);
          expect(hasIncomeOver200k).toBeTruthy();
        });
      });
      describe('When hasIncomeOver200k is false', () => {
        test('should return the correct condition value', () => {
          const userInfo = {
            income: 11111,
          };
          const { values: { hasIncomeOver200k } } = RiskProfileService(userInfo);
          expect(hasIncomeOver200k).toBeFalsy();
        });
      });
    });
    describe('houseIsMortgaged', () => {
      describe('When houseIsMortgaged is true', () => {
        test('should return the correct condition value', () => {
          const userInfo = {
            house: {
              ownershipStatus: 'mortgaged',
            },
          };
          const { values: { houseIsMortgaged } } = RiskProfileService(userInfo);
          expect(houseIsMortgaged).toBeTruthy();
        });
      });
      describe('When houseIsMortgaged is false', () => {
        test('should return the correct condition value', () => {
          const userInfo = {
            house: {
              ownershipStatus: 'owned',
            },
          };
          const { values: { houseIsMortgaged } } = RiskProfileService(userInfo);
          expect(houseIsMortgaged).toBeFalsy();
        });
      });
    });

    describe('hasDependents', () => {
      describe('When hasDependents is true', () => {
        test('should return the correct condition value', () => {
          const userInfo = {
            dependents: 2,
          };
          const { values: { hasDependents } } = RiskProfileService(userInfo);
          expect(hasDependents).toBeTruthy();
        });
      });
      describe('When hasDependents is false', () => {
        test('should return the correct condition value', () => {
          const userInfo = {
            dependents: 0,
          };
          const { values: { hasDependents } } = RiskProfileService(userInfo);
          expect(hasDependents).toBeFalsy();
        });
      });
    });
    describe('isMarried', () => {
      describe('When isMarried is true', () => {
        test('should return the correct condition value', () => {
          const userInfo = {
            maritalStatus: 'married',
          };
          const { values: { isMarried } } = RiskProfileService(userInfo);
          expect(isMarried).toBeTruthy();
        });
      });
      describe('When isMarried is false', () => {
        test('should return the correct condition value', () => {
          const userInfo = {
            maritalStatus: 'single',
          };
          const { values: { isMarried } } = RiskProfileService(userInfo);
          expect(isMarried).toBeFalsy();
        });
      });
    });
    describe('hasHome', () => {
      describe('When hasHome is true', () => {
        test('should return the correct condition value', () => {
          const userInfo = {
            house: {
              ownershipStatus: 'owned',
            },
          };
          const { values: { hasHome } } = RiskProfileService(userInfo);
          expect(hasHome).toBeTruthy();
        });
      });
      describe('When hasHome is false', () => {
        test('should return the correct condition value', () => {
          const userInfo = {};
          const { values: { hasHome } } = RiskProfileService(userInfo);
          expect(hasHome).toBeFalsy();
        });
      });
    });
    describe('hasVehicle', () => {
      describe('When hasVehicle is true', () => {
        test('should return the correct condition value', () => {
          const userInfo = {
            vehicle: {
              year: 'owned',
            },
          };
          const { values: { hasVehicle } } = RiskProfileService(userInfo);
          expect(hasVehicle).toBeTruthy();
        });
      });
      describe('When hasVehicle is false', () => {
        test('should return the correct condition value', () => {
          const userInfo = {};
          const { values: { hasVehicle } } = RiskProfileService(userInfo);
          expect(hasVehicle).toBeFalsy();
        });
      });
    });
    describe('isNewVehicle', () => {
      describe('When isNewVehicle is true', () => {
        test('should return the correct condition value', () => {
          const subYear = Math.floor(Math.random() * 5);
          const year = getYear(subYears(new Date(), subYear));
          const userInfo = {
            vehicle: {
              year,
            },
          };
          const { values: { isNewVehicle } } = RiskProfileService(userInfo);
          expect(isNewVehicle).toBeTruthy();
        });
      });
      describe('When isNewVehicle is false', () => {
        test('should return the correct condition value', () => {
          const subYear = Math.floor(Math.random() * 20) + 6;
          const year = getYear(subYears(new Date(), subYear));
          const userInfo = {
            vehicle: {
              year,
            },
          };
          const { values: { isNewVehicle } } = RiskProfileService(userInfo);
          expect(isNewVehicle).toBeFalsy();
        });
      });
    });
  });
  describe('#functions', () => {
    describe('getFinalScore', () => {
      describe('when risk score is nill', () => {
        test('should return "ineligible"', () => {
          const riskScore = null;
          const { functions: { getFinalScore } } = RiskProfileService({});
          expect(getFinalScore(riskScore)).toBe('ineligible');
        });
      });
      describe('when risk score is  0 and below', () => {
        test('should return "economic"', () => {
          const riskScore = Math.floor(Math.random() * 3) * -1;
          const { functions: { getFinalScore } } = RiskProfileService({});
          expect(getFinalScore(riskScore)).toBe('economic');
        });
      });
      describe('when risk score is 1 and 2', () => {
        test('should return "regular"', () => {
          const riskScore = Math.floor(Math.random() * 2) + 1;
          const { functions: { getFinalScore } } = RiskProfileService({});
          expect(getFinalScore(riskScore)).toBe('regular');
        });
      });
      describe('when risk score is 3 and above', () => {
        test('should return "regular"', () => {
          const riskScore = Math.floor(Math.random() * 6) + 3;
          const { functions: { getFinalScore } } = RiskProfileService({});
          expect(getFinalScore(riskScore)).toBe('responsible');
        });
      });
    });
  });
});
