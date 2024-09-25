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