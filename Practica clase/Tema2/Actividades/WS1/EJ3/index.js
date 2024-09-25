let seconds = 60;

for (let i = seconds; i >= 0; i--) {
    setTimeout(() => {
        document.write(i);
        if (i === 0) {
            document.write("¡Tiempo terminado!");
        }
    }, (seconds - i) * 1000);
}
