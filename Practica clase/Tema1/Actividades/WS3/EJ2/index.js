function calculateAge(birthYear, currentYear){
    let age1 = currentYear - birthYear;
    let age2 = age1 - 1;

    return console.log("You are either "+age1+" or "+age2);
}

const currentYear = new Date().getFullYear();

calculateAge(1990, currentYear);
calculateAge(2000, currentYear);
calculateAge(1986, currentYear);