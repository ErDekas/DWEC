let a=parseInt(prompt('Introduce un coeficiente a'));
let b=parseInt(prompt('Introduce un coeficiente b'));
let c=parseInt(prompt('Introduce un coeficiente c'));
document.write('<br>');
document.write(-b+Math.sqrt(Math.pow(b,2)-4*a*c)/2*a+' y ');
document.write(-b-Math.sqrt(Math.pow(b,2)-4*a*c)/2*a);