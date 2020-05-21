const { curry, pipe, isNil } = require('ramda');
const { differenceInCalendarYears } = require('date-fns/fp');

const deductionRisk = curry((condition, value, initialRisk) =>
  (condition ? initialRisk - value : initialRisk));

const addRisk = curry((condition, value, initialRisk) =>
  (condition ? initialRisk + value : initialRisk));

const generateConditions = userInfo => ({
  hasIncome: Boolean(userInfo.income),
  isUnder60Years: userInfo.age <= 60,
  isUnder30Years: userInfo.age <= 30,
  isBetween30n40Years: userInfo.age <= 40 && userInfo.age >= 30,
  hasIncomeOver200k: userInfo.income >= 200000,
  houseIsMortgaged: userInfo.house?.ownershipStatus === 'mortgaged',
  hasDependents: userInfo.dependents > 0,
  isMarried: userInfo.maritalStatus === 'married',
  hasHome: Boolean(userInfo.house),
  hasVehicle: Boolean(userInfo.vehicle),
  isNewVehicle:
    differenceInCalendarYears(new Date(userInfo.vehicle?.year, 1, 1))(new Date()) <= 5,
});

const getFinalScore = (riskScore) => {
  const isIneligible = isNil(riskScore);
  const isEconomic = riskScore <= 0;
  const isRegular = riskScore > 0 && riskScore <= 2;
  return isIneligible
    ? 'ineligible'
    : isEconomic
      ? 'economic'
      : isRegular
        ? 'regular'
        : 'responsible';
};

module.exports = (userInfo) => {
  const {
    isUnder30Years,
    isBetween30n40Years,
    hasIncomeOver200k,
    houseIsMortgaged,
    hasDependents,
    isMarried,
    isNewVehicle,
  } = generateConditions(userInfo);

  const deductUnder30Years = deductionRisk(isUnder30Years)(2);
  const deductBetween30n40Years = deductionRisk(isBetween30n40Years)(1);
  const deductionByAge = pipe(deductUnder30Years, deductBetween30n40Years);

  return {
    values: generateConditions(userInfo),
    functions: {
      getFinalScore,
      deductionByAge,
      deductIncomeOver200k: deductionRisk(hasIncomeOver200k)(1),
      addHouseIsMortgaged: addRisk(houseIsMortgaged)(1),
      addHasDependents: addRisk(hasDependents)(1),
      addIsMarried: addRisk(isMarried)(1),
      deductIsMarried: deductionRisk(isMarried)(1),
      addIsNewVehicle: addRisk(isNewVehicle)(1),
    },
  };
};
