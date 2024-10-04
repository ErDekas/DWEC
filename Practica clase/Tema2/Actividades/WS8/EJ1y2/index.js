// Seleccionamos el elemento de video en el DOM donde se mostrará el flujo de la cámara
const video = document.getElementById('video');

// Solicitamos acceso a la cámara del usuario
navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" } })
    .then(mediaStream => {
        // Si se concede el acceso, asignamos el flujo de video al elemento de video
        video.srcObject = mediaStream;
    })
    .catch(error => {
        // Si hay un error (por ejemplo, permiso denegado), se muestra un mensaje en la consola
        console.error('Error accediendo a la webcam:', error);
    });

// Seleccionamos el elemento de audio en el DOM para capturar el flujo de audio del micrófono
const audio = document.getElementById('audio');

// Solicitamos acceso al micrófono
navigator.mediaDevices.getUserMedia({ audio: true })
    .then(mediaStream => {
        // Si se concede el acceso, asignamos el flujo de audio al elemento de audio
        audio.srcObject = mediaStream;
    })
    .catch(error => {
        // Si hay un error, se muestra un mensaje en la consola
        console.error('Error accediendo al micrófono:', error);
    });

// Seleccionamos el botón que iniciará la grabación
const button = document.querySelector('button');

// Añadimos un evento de escucha al botón que ejecutará una función asíncrona al hacer clic
button.addEventListener('click', async () => {
    // Solicitamos acceso al micrófono nuevamente
    const audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });
    
    // Solicitamos acceso a la pantalla para grabar video y audio
    const screenStream = await navigator.mediaDevices.getDisplayMedia({
        video: { frameRate: { ideal: 30 } }, // Establecemos una tasa de fotogramas ideal de 30
        audio: true // También capturamos audio de la pantalla si está disponible
    });

    // Creamos un nuevo MediaStream combinando el video de la pantalla y el audio del micrófono
    const combinedStream = new MediaStream([
        ...screenStream.getVideoTracks(), // Añadimos las pistas de video de la pantalla
        ...audioStream.getAudioTracks()   // Añadimos el audio del micrófono
    ]);

    // Creamos un MediaRecorder para grabar el flujo combinado
    const mediarecorder = new MediaRecorder(combinedStream, {
        mimeType: 'video/webm; codecs=vp8,opus' // Establecemos el tipo MIME para la grabación
    });

    // Iniciamos la grabación
    mediarecorder.start();

    // Obtenemos la primera pista de video de la grabación de la pantalla
    const [video] = screenStream.getVideoTracks();

    // Añadimos un evento que se activará cuando la grabación de la pantalla termine
    video.addEventListener("ended", () => {
        // Detenemos la grabación cuando la pista de video finaliza
        mediarecorder.stop();
    });

    // Añadimos un evento que se activará cuando haya datos disponibles de la grabación
    mediarecorder.addEventListener("dataavailable", (e) => {
        // Creamos un enlace para descargar el archivo grabado
        const link = document.createElement("a");
        link.href = URL.createObjectURL(e.data); // Generamos un enlace a los datos grabados
        link.download = "captura.webm"; // Establecemos el nombre del archivo
        link.click(); // Simulamos un clic para iniciar la descarga
    });
});
