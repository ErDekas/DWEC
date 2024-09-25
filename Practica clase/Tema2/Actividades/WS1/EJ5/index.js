const formatearNumero = (numero) => {
    return (numero < 10 ? '0' : '') + numero;
};

const actualizarReloj = () => {
    const ahora = new Date();
    const horas = formatearNumero(ahora.getHours());
    const minutos = formatearNumero(ahora.getMinutes());
    const segundos = formatearNumero(ahora.getSeconds());

    document.body.innerHTML = `<h1>${horas}:${minutos}:${segundos}</h1>`;
    setTimeout(actualizarReloj, 1000);
};

actualizarReloj();
