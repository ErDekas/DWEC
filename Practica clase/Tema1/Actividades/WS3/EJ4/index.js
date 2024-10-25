function calcCircumference(radius) {
    const circumference = 2 * Math.PI * radius;
    console.log(`The circumference is ${circumference.toFixed(2)}`);
}
function calcArea(radius) {
    const area = Math.PI * radius * radius;
    console.log(`The area is ${area.toFixed(2)}`);
}

const radius1 = 5;
const radius2 = 10;
const radius3 = 3.5;

calcCircumference(radius1);
calcArea(radius1);

calcCircumference(radius2);
calcArea(radius2);

calcCircumference(radius3);
calcArea(radius3);