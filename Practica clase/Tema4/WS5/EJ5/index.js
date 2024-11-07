document.addEventListener("DOMContentLoaded", function () {
  const cardNumberInput = document.getElementById("card-number");
  const cardHolderInput = document.getElementById("card-holder");
  const expirationMonthInput = document.getElementById("expiration-month");
  const expirationYearInput = document.getElementById("expiration-year");
  const cvvInput = document.getElementById("cvv");

  const displayCardNumber = document.querySelector(".card-number");
  const displayCardHolder = document.querySelector(".card-holder");
  const displayExpiryDate = document.querySelector(".expiry-date");
  const creditCard = document.querySelector(".credit-card");
  const backContainer = creditCard.querySelector(".back");

  // Función para formatear el número de tarjeta con espacios cada 4 dígitos
  function formatCardNumber(cardNumber) {
    return cardNumber.replace(/(\d{4})(?=\d)/g, "$1 ");
  }

  // Función para enmascarar el número de tarjeta y agregar espacios
  function maskCardNumber(cardNumber) {
    // Eliminar cualquier caracter que no sea un número
    cardNumber = cardNumber.replace(/\D/g, "");

    // Enmascarar los números entre los primeros 4 y los últimos 4 dígitos
    let maskedCardNumber = cardNumber
      .split("")
      .map((digit, index) => {
        if (index < 4 || index >= cardNumber.length - 4) {
          return digit; // Mostrar los primeros 4 y últimos 4 dígitos tal como están
        }
        return "*"; // Enmascarar los dígitos intermedios con '*'
      })
      .join("");

    // Añadir espacios después de cada 4 dígitos o asteriscos
    maskedCardNumber = maskedCardNumber.replace(/(.{4})(?=.)/g, "$1 ");

    // Si el número es menor de 16 caracteres, completarlo con '#'
    if (maskedCardNumber.length < 19) {
      maskedCardNumber = maskedCardNumber.padEnd(19, "#");
    }

    return maskedCardNumber;
  }

  // Actualizar el número de tarjeta en tiempo real con separaciones cada 4 dígitos
  cardNumberInput.addEventListener("input", () => {
    let cardNumber = cardNumberInput.value;
    cardNumberInput.value = formatCardNumber(cardNumber); // Se formatea con espacios

    // Actualizar la visualización de la tarjeta con el número enmascarado
    displayCardNumber.textContent = maskCardNumber(cardNumber);
  });

  // Actualizar el nombre del titular en tiempo real
  cardHolderInput.addEventListener("input", () => {
    displayCardHolder.textContent = `Card Holder: ${
      cardHolderInput.value.toUpperCase() || "FULL NAME"
    }`;
  });

  // Actualizar la fecha de expiración en tiempo real
  expirationMonthInput.addEventListener("change", updateExpiryDate);
  expirationYearInput.addEventListener("change", updateExpiryDate);

  function updateExpiryDate() {
    const month = expirationMonthInput.value || "MM";
    const year = expirationYearInput.value
      ? expirationYearInput.value.slice(-2)
      : "YY";
    displayExpiryDate.textContent = `Expires: ${month}/${year}`;
  }

  cvvInput.addEventListener("focus", () => {
    creditCard.classList.add("flip"); // Rota la tarjeta
    displayCardNumber.style.display = "none"; // Ocultar número en el reverso
    displayExpiryDate.style.display = "none"; // Ocultar fecha de expiración
    displayCardHolder.style.display = "none"; // Ocultar nombre del titular
  
    // Crear y mostrar el CVV en el reverso
    const displayCVV = document.createElement("div");
    displayCVV.classList.add("display-cvv");
    displayCVV.id = "display-cvv";
    backContainer.appendChild(displayCVV);
  });
  
  cvvInput.addEventListener("input", () => {
    const cvv = cvvInput.value.slice(0, 3);
    document.getElementById("display-cvv").textContent = cvv; // Actualizar el CVV en tiempo real
  });
  
  cvvInput.addEventListener("blur", () => {
    creditCard.classList.remove("flip"); // Volver al frente de la tarjeta
    displayCardNumber.style.display = ""; // Mostrar número nuevamente
    displayExpiryDate.style.display = ""; // Mostrar fecha de expiración
    displayCardHolder.style.display = ""; // Mostrar nombre del titular
  
    // Remover el CVV del reverso cuando no esté en foco
    const displayCVV = document.getElementById("display-cvv");
    if (displayCVV) displayCVV.remove();
  });  
});
