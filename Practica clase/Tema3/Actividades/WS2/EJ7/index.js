function inicializarArray(){
    return new Array(10).fill(0);
}
function añadirUno(){
    for(let i = 0; i<Array.length;i++){
        array[i]+=1;
    }
}
function mostrarArray(){
    console.log(array.join(' '));
}