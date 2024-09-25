document.write(Math.random()+'<br>');
document.write(Math.random()*100+100+'<br>');
let n1 = parseInt(prompt("Introduce un numero"))
let n2 = parseInt(prompt("Introduce un numero"))
document.write(Math.random()*(n2-n1)+n1);


let a=parseInt(prompt('Introduce un coeficiente a'));
let b=parseInt(prompt('Introduce un coeficiente b'));
let c=parseInt(prompt('Introduce un coeficiente c'));
document.write('<br>');
document.write(-b+Math.sqrt(Math.pow(b,2)-4*a*c)/2*a+' y ');
document.write(-b-Math.sqrt(Math.pow(b,2)-4*a*c)/2*a);


document.write('<br>Tabla');
document.write('<br><table>');
let na=1;
while(na<180){
    document.write('<tr>');
    document.write('<td>'+(na)+'</td>');
    document.write('<td>'+Math.sin(na)+'</td>');
    document.write('</tr>');
    na++;
}
document.write('</table>');

let img1;
let img2;
let img3;
let imagenAleatoria=Math.floor(Math.random()*3)+1;
if(imagenAleatoria===1){
    document.write('<img src="'+img1+'"');
}else if(imagenAleatorioa===2){
    document.write('<img src="'+img2+'"');
}else if(imagenAleatoria===3){
    document.write('<img src="'+img3+'"');
}else{
    document.write('Algo salió mal');
}