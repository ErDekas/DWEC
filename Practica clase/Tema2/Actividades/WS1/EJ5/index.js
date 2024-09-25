const actualizarReloj = () => {
    const ahora = new Date();
    const horas = String(ahora.getHours()).padStart(2, '0');
    const minutos = String(ahora.getMinutes()).padStart(2, '0');
    const segundos = String(ahora.getSeconds()).padStart(2, '0');

    document.getElementById('reloj').textContent = `${horas}:${minutos}:${segundos}`;
    setTimeout(actualizarReloj, 1000);
};

actualizarReloj();
