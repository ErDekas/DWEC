let img1;
let img2;
let img3;
let imagenAleatoria=Math.floor(Math.random()*3)+1;
if(imagenAleatoria===1){
    document.write('<img src="'+img1+'"');
}else if(imagenAleatoria===2){
    document.write('<img src="'+img2+'"');
}else if(imagenAleatoria===3){
    document.write('<img src="'+img3+'"');
}else{
    document.write('Algo salió mal');
}