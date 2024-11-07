// Seleccionamos el campo de entrada y los elementos de validación
const usernameInput = document.getElementById("username");
const lowercaseRequirement = document.getElementById("lowercase");
const uppercaseRequirement = document.getElementById("uppercase");
const lengthRequirement = document.getElementById("length");

// Función para verificar los requisitos en tiempo real
usernameInput.addEventListener("input", () => {
  const value = usernameInput.value;

  // Verificar si tiene al menos una letra minúscula
  if (/[a-z]/.test(value)) {
    lowercaseRequirement.style.display = "none";
  } else {
    lowercaseRequirement.style.display = "list-item";
  }

  // Verificar si tiene al menos una letra mayúscula
  if (/[A-Z]/.test(value)) {
    uppercaseRequirement.style.display = "none";
  } else {
    uppercaseRequirement.style.display = "list-item";
  }

  // Verificar si tiene una longitud mínima de 6 caracteres
  if (value.length >= 6) {
    lengthRequirement.style.display = "none";
  } else {
    lengthRequirement.style.display = "list-item";
  }
});
