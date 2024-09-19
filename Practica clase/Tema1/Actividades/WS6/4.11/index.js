document.write('<table border="0" cellspacing="2" bgcolor="black" width="200">');
let altura = parseInt(prompt("Introduce la altura de la tabla"));
document.write('<tr bgcolor="white" height="'+altura+'">');
let nColumnas = parseInt(prompt("Introduce el numero de columnas"));
let anchura = parseInt(prompt("Introduce la anchura de la tabla"));
for(let i = 0; i<=nColumnas;i++){
    document.write('<td width="'+anchura+'">&nbsp;</td>');
}
document.write("</tr>");
document.write("</table>");