let notaexamen1 = parseFloat(prompt("Introduce tu primera nota de examen"));
let notaexamen2 = parseFloat(prompt("Introduce tu segunda nota de examen"));
let notatrabajo1 = parseFloat(prompt("Introduce tu primera nota de trabajo"));
let notatrabajo2 = parseFloat(prompt("Introduce tu segunda nota de trabajo"));

let medianotaExamen = (notaexamen1+notaexamen2)/2;
let medianotaTrabajo = (notatrabajo1+notatrabajo2)/2;

let notaMedia = (medianotaExamen*75/100)+(medianotaTrabajo*25/100);

if(notaMedia>=5){
    document.write("Aprobado");
}else if(notaexamen1>=4.5&&notaexamen2>=4.5&&notatrabajo1>=4.5&&notatrabajo2>=4.5){
    document.write("Aprobado");
}
else{
    document.write("Reprobado");
}