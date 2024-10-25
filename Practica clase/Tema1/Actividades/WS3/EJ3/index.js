function calculateSupply(age, amountPerDay){
    const MAX_AGE = 100;
    const remainingYears = MAX_AGE - age;
    const totalAmountNeeded = remainingYears * 365 * amountPerDay;

    const roundedAmountNeeded = Math.round(totalAmountNeeded);

    return console.log("You will need "+roundedAmountNeeded+" to last you until the ripe old age of "+MAX_AGE);
}

calculateSupply(25, 2.5);
calculateSupply(40, 1.75);
calculateSupply(70, 3.0);