const fechaHoy = new Date();
document.write('Fecha de hoy '+ fechaHoy.toLocaleString());
const fecha85 = new Date(fechaHoy);
fecha85.setDate(fechaHoy.getDate() + 85);
document.write('<br>Fecha de hoy en 85 días '+ fecha85.toLocaleString());
const fecha187 = new Date(fechaHoy);
fecha187.setDate(fechaHoy.getDate() - 187);
document.write('<br>Fecha de hoy en 187 días '+ fecha187.toLocaleString());
const fecha85Mas2Anos = new Date(fecha85);
fecha85Mas2Anos.setFullYear(fecha85.getFullYear() + 2);
document.write('<br>Fecha de hoy en 85 días y 2 años '+ fecha85Mas2Anos.toLocaleString());
const fecha187Menos24Horas = new Date(fecha187);
fecha187Menos24Horas.setHours(fecha187.getHours() - 24);
document.write('<br>Fecha de hoy en 187 días menos 24 horas'+ fecha187Menos24Horas.toLocaleString());
const fechaResto = fecha85 - fecha187;
const diasDiferencia = Math.floor(fechaResto / (1000 * 60 * 60 * 24));
document.write('<br>Diferencia en días entre '+fecha85.toLocaleString()+' y '+fecha187.toLocaleString() +' es de: '+ diasDiferencia);