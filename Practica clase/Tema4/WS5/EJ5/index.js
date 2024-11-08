document.addEventListener("DOMContentLoaded", function () {
  const cardNumberInput = document.getElementById("card-number");
  const cardHolderInput = document.getElementById("card-holder");
  const expirationMonthInput = document.getElementById("expiration-month");
  const expirationYearInput = document.getElementById("expiration-year");
  const cvvInput = document.getElementById("cvv");

  const displayCardNumber = document.querySelector(".card-number");
  const displayCardHolder = document.querySelector(".card-holder");
  const displayExpiryDate = document.querySelector(".expiry-date");
  const displayCVVInput = document.querySelector(".cvv");
  const creditCard = document.querySelector(".credit-card");

  // Verificar si el contenedor .back existe
  let backContainer = creditCard.querySelector(".back");

  // Si no existe, crearlo dinámicamente
  if (!backContainer) {
    backContainer = document.createElement("div");
    backContainer.classList.add("back");
    creditCard.appendChild(backContainer);
  }

  // Función para formatear el número de tarjeta con espacios cada 4 dígitos
  function formatCardNumber(cardNumber) {
    return cardNumber.replace(/(\d{4})(?=\d)/g, "$1 ").trim();
  }

  // Función para enmascarar el número de tarjeta y agregar espacios
  function maskCardNumber(cardNumber) {
    cardNumber = cardNumber.replace(/\D/g, "");

    let maskedCardNumber = cardNumber
      .split("")
      .map((digit, index) => {
        if (index < 4 || index >= cardNumber.length - 4) {
          return digit;
        }
        return "*";
      })
      .join("");

    maskedCardNumber = maskedCardNumber.replace(/(.{4})(?=.)/g, "$1 ");
    return maskedCardNumber;
  }

  // Actualizar el número de tarjeta en tiempo real con separaciones
  cardNumberInput.addEventListener("input", () => {
    // Validar que solo se ingresen números
    cardNumberInput.value = cardNumberInput.value.replace(/\D/g, "");

    let cardNumber = cardNumberInput.value;
    cardNumberInput.value = formatCardNumber(cardNumber);
    displayCardNumber.textContent = maskCardNumber(cardNumber);
  });

  // Actualizar el nombre del titular, validando solo letras
  cardHolderInput.addEventListener("input", () => {
    // Validar que solo se ingresen letras (y espacios)
    cardHolderInput.value = cardHolderInput.value.replace(/[^a-zA-Z\s]/g, "");

    displayCardHolder.textContent = `Card Holder: ${
      cardHolderInput.value.toUpperCase() || "FULL NAME"
    }`;
  });

  // Actualizar la fecha de expiración
  expirationMonthInput.addEventListener("change", updateExpiryDate);
  expirationYearInput.addEventListener("change", updateExpiryDate);

  function updateExpiryDate() {
    const month = expirationMonthInput.value || "MM";
    const year = expirationYearInput.value
      ? expirationYearInput.value.slice(-2)
      : "YY";
    displayExpiryDate.textContent = `Expires: ${month}/${year}`;
  }

  // Manejo de interacciones con el CVV
  cvvInput.addEventListener("input", () => {
    // Validar que solo se ingresen números en el CVV
    cvvInput.value = cvvInput.value.replace(/\D/g, "");

    const cvv = cvvInput.value.slice(0, 3); // Limitar a 3 dígitos
    const displayCVV = document.getElementById("discvv");
    if (displayCVV) {
      displayCVV.textContent = `CVV: ${cvv}`;
    }
  });

  cvvInput.addEventListener("focus", () => {
    creditCard.classList.add("flip");
    displayCardNumber.style.display = "none";
    displayExpiryDate.style.display = "none";
    displayCardHolder.style.display = "none";

    // Crear y agregar el campo CVV solo cuando se necesita
    let displayCVV = document.getElementById("display-cvv");
    if (!displayCVV) {
      displayCVV = document.createElement("div");
      displayCVV.classList.add("display-cvv");
      displayCVV.id = "display-cvv";
      backContainer.appendChild(displayCVV);
    }
  });

  cvvInput.addEventListener("blur", () => {
    creditCard.classList.remove("flip");
    displayCardNumber.style.display = "";
    displayExpiryDate.style.display = "";
    displayCardHolder.style.display = "";

    // Eliminar el campo CVV cuando ya no sea necesario
    const displayCVV = document.getElementById("display-cvv");
    if (displayCVV) {
      displayCVV.remove();
    }
  });
});
