function paresImpares(){
    const numeros = Array.from({ length: 100 }, () => Math.floor(Math.random() * 1000) + 1);

    console.log(numeros);

    const pares = numeros.filter(num => num%2==0);
    const impares = numeros.filter(num => num%2!=0);

    const numerosOrganizados = [...pares, ...impares];

    console.log(numerosOrganizados);
}

paresImpares();