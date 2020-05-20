module.exports = (userInfo) => {
  const hasIncome = Boolean(userInfo.income);

  const isUnder60Years = userInfo.age <= 60;

  const isUnder30Years = userInfo.age <= 30;

  const isBetween30n40Years = userInfo.age <= 40 && userInfo.age >= 30;

  const hasIncomeOver200k = userInfo.income >= 200000;

  const houseIsMortgaged = userInfo.house.ownershipStatus === 'mortgaged';

  const hasDependents = userInfo.dependents >= 0;

  const isMarried = userInfo.maritalStatus === 'married';

  const deductUnder30Years = initialRisk =>
    (isUnder30Years ? initialRisk - 2 : initialRisk);

  const deductBetween30n40Years = initialRisk =>
    (isBetween30n40Years ? initialRisk - 1 : initialRisk);
  const deductionByAge = initialRisk => (isUnder30Years
    ? deductUnder30Years(initialRisk)
    : isBetween30n40Years
      ? deductBetween30n40Years(initialRisk)
      : initialRisk);

  const deductIncomeOver200k = initialRisk =>
    (hasIncomeOver200k ? initialRisk - 1 : initialRisk);

  const addHouseIsMortgaged = initialRisk =>
    (houseIsMortgaged ? initialRisk + 1 : initialRisk);

  const addHasDependents = initialRisk =>
    (hasDependents ? initialRisk + 1 : initialRisk);

  const addIsMarried = initialRisk =>
    (isMarried ? initialRisk + 1 : initialRisk);

  const deductIsMarried = initialRisk =>
    (isMarried ? initialRisk - 1 : initialRisk);

  return {
    values: {
      hasIncome,
      isUnder60Years,
      isUnder30Years,
      isBetween30n40Years,
      hasIncomeOver200k,
      houseIsMortgaged,
      hasDependents,
      isMarried,
    },
    functions: {
      deductionByAge,
      deductIncomeOver200k,
      addHouseIsMortgaged,
      addHasDependents,
      addIsMarried,
      deductIsMarried,
    },
  };
};
