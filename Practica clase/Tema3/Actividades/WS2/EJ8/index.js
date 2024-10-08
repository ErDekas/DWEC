function simularDado(){
    const lanzamientos = 36000;
    const frecuencias = new Array(13).fill(0);

    for(let i = 0; i < lanzamientos; i++){
        const dado1 = Math.floor(Math.random()*6)+1;
        const dado2 = Math.floor(Math.random()*6)+1;
        const suma = dado1 + dado2;
        frecuencias[suma]++;
    }

    console.log("Frecuencia de sumas al lanzar dos dados:");
    for (let i = 2; i <= 12; i++) {
        console.log(`Suma ${i}: ${frecuencias[i]} veces`);
    }
}
