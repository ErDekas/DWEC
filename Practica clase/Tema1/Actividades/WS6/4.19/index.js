let tamanoCelda = parseInt(prompt("Introduce el tamaño de la celda (en píxeles):"));

document.write('<table cellspacing="0" cellpadding="0" border="1">');

for (let fila = 0; fila < 8; fila++) {
    document.write('<tr>');
    
    for (let columna = 0; columna < 8; columna++) {
        let color;
        if((fila+columna)%2===0){
            color = 'black';
        }else{
            color = 'white';
        }
        
        document.write(`<td style="width:${tamanoCelda}px; height:${tamanoCelda}px; background-color:${color};"></td>`);
    }
    
    document.write('</tr>');
}

document.write('</table>');