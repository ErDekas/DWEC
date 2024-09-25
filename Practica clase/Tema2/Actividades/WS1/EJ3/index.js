let seconds = 61;

for (let i = seconds; i >= 0; i--) {
    setTimeout(() => {
        document.getElementById('seconds').textContent=`${i}`;
        if (i === 0) {
            document.write("¡Tiempo terminado!");
        }
    }, (seconds - i) * 1000);
}
