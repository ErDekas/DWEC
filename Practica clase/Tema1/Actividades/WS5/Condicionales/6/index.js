let edad = parseInt(prompt("Introduce tu edad"));
let localidad = prompt("Introduce tu localidad");

if((edad>=18 && edad<=30) && (localidad=="Madrid")){
    document.write("Puedes acceder al carnet de empresarios emprendedores");
}