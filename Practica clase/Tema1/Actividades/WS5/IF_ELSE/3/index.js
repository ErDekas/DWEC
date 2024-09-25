let edad = parseInt(prompt("Introduce tu edad"));
if(edad<5){
    document.write("Estas en el jardín de infancia");
}else if(edad>=6 && edad<=11){
    document.write("Estas en la primaria");
}else if(edad>=12 && edad<=16){
    document.write("Estas en la ESO");
}else if(edad>=17 && edad<=21){
    document.write("Estas en el bachillerato");
}else{
    document.write("Estas en la universidad");
}