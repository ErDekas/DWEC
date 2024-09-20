document.write('<table border="0" cellspacing="2" bgcolor="black" width="200">');
let altura = parseInt(prompt("Introduce la altura de la tabla"));
let nFilas = parseInt(prompt("Introduce el numero de filas"));
let nColumnas = parseInt(prompt("Introduce el numero de columnas"));
let anchura = parseInt(prompt("Introduce la anchura de la tabla"));
for(let j = 0;j<nFilas;j++){
    document.write('<tr bgcolor="white" height="'+altura+'">&nbsp;');
    for(let i = 0; i<nColumnas;i++){
        document.write('<td width="'+anchura+'">&nbsp;</td>');
    }
    document.write('</tr>');
}
document.write("</table>");