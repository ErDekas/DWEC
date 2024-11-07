const nombre = document.getElementById("name");
const apellidos = document.getElementById("apellidos");
const telefono = document.getElementById("telefono");
const DNI = document.getElementById("DNI");
const email = document.getElementById("email");
const usuario = document.getElementById("usuario");
const password = document.getElementById("password");
const Rpassword = document.getElementById("Rpassword");

const validationMessages = {
    nombre: document.getElementById("name-validation"),
    apellidos: document.getElementById("apellidos-validation"),
    telefono: document.getElementById("telefono-validation"),
    DNI: document.getElementById("DNI-validation"),
    email: document.getElementById("email-validation"),
    usuario: document.getElementById("usuario-validation"),
    password: document.getElementById("password-validation"),
    Rpassword: document.getElementById("Rpassword-validation")
};

// Expresiones regulares
const regexNombre = /^[a-zA-ZÀ-ÿ\s]{2,30}$/;
const regexApellido = /^[a-zA-ZÀ-ÿ\s]{2,30}$/;
const regexTelefono = /^\d{9,15}$/;
const regexDNI = /^\d{8}[A-Z]$/;
const regexEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,4})+$/;

// Función de validación de cada campo
function validarCampo(campo, regex, mensajeElemento, mensajeError) {
    if (regex.test(campo.value)) {
        mensajeElemento.textContent = "✔️ Correcto";
        mensajeElemento.style.color = "green";
    } else {
        mensajeElemento.textContent = mensajeError;
        mensajeElemento.style.color = "red";
    }
}

// Validaciones individuales para cada campo en evento "blur"
nombre.addEventListener("blur", () => validarCampo(nombre, regexNombre, validationMessages.nombre, "El nombre debe tener entre 2 y 30 caracteres y solo letras."));
apellidos.addEventListener("blur", () => validarCampo(apellidos, regexApellido, validationMessages.apellidos, "Los apellidos deben tener entre 2 y 30 caracteres y solo letras."));
telefono.addEventListener("blur", () => validarCampo(telefono, regexTelefono, validationMessages.telefono, "El teléfono debe tener entre 9 y 15 dígitos."));
DNI.addEventListener("blur", () => validarCampo(DNI, regexDNI, validationMessages.DNI, "El DNI debe tener 8 dígitos seguidos de una letra mayúscula."));
email.addEventListener("blur", () => validarCampo(email, regexEmail, validationMessages.email, "El email no es válido."));
usuario.addEventListener("blur", () => {
    if (usuario.value.length >= 4) {
        validationMessages.usuario.textContent = "✔️ Correcto";
        validationMessages.usuario.style.color = "green";
    } else {
        validationMessages.usuario.textContent = "El usuario debe tener al menos 4 caracteres.";
        validationMessages.usuario.style.color = "red";
    }
});
password.addEventListener("blur", () => {
    if (password.value.length >= 8) {
        validationMessages.password.textContent = "✔️ Correcto";
        validationMessages.password.style.color = "green";
    } else {
        validationMessages.password.textContent = "La contraseña debe tener al menos 8 caracteres.";
        validationMessages.password.style.color = "red";
    }
});
Rpassword.addEventListener("blur", () => {
    if (Rpassword.value === password.value && Rpassword.value.length >= 8) {
        validationMessages.Rpassword.textContent = "✔️ Contraseñas coinciden";
        validationMessages.Rpassword.style.color = "green";
    } else {
        validationMessages.Rpassword.textContent = "Las contraseñas no coinciden.";
        validationMessages.Rpassword.style.color = "red";
    }
});
