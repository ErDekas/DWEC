// Selección de elementos
const form = document.querySelector(".grocery-form");
const alert = document.querySelector(".alert");
const grocery = document.getElementById("grocery");
const submitBtn = document.querySelector(".submit-btn");
const container = document.querySelector(".grocery-container");
const list = document.querySelector(".grocery-list");
const clearBtn = document.querySelector(".clear-btn");

let editElement = null;
let editFlag = false;
let editID = "";

// Eventos
form.addEventListener("submit", addItem);
clearBtn.addEventListener("click", clearItems);
window.addEventListener("DOMContentLoaded", setupItems);

// Función para agregar un ítem
function addItem(e) {
  e.preventDefault();
  const value = grocery.value.trim();
  const id = editFlag ? editID : Date.now().toString();

  if (value) {
    if (!editFlag) {
      createListItem(id, value);
      addToLocalStorage(id, value);
      displayAlert("Item added to the list", "success");
    } else {
      editElement.textContent = value;
      updateLocalStorage(id, value);
      displayAlert("Value updated", "success");
    }
    setBackToDefault();
  } else {
    displayAlert("Please enter a value", "danger");
  }
}

// Función para mostrar alertas
function displayAlert(message, action) {
  alert.textContent = message;
  alert.classList.add(`alert-${action}`);
  setTimeout(() => {
    alert.textContent = "";
    alert.classList.remove(`alert-${action}`);
  }, 1000);
}

// Función para limpiar todos los ítems
function clearItems() {
  list.innerHTML = "";
  container.classList.remove("show-container");
  displayAlert("List cleared", "danger");
  localStorage.removeItem("list");
  setBackToDefault();
}

// Función para eliminar un ítem
function deleteItem(id, element) {
  list.removeChild(element);
  if (!list.children.length) {
    container.classList.remove("show-container");
  }
  displayAlert("Item removed", "danger");
  removeFromLocalStorage(id);
}

// Función para editar un ítem
function editItem(id, element) {
  editElement = element.querySelector(".title");
  grocery.value = editElement.textContent;
  editFlag = true;
  editID = id;
  submitBtn.textContent = "Edit";
}

// Restaurar valores por defecto
function setBackToDefault() {
  grocery.value = "";
  editFlag = false;
  editID = "";
  submitBtn.textContent = "Submit";
}

// Almacenamiento local
function addToLocalStorage(id, value) {
  const items = getLocalStorage();
  items.push({ id, value });
  localStorage.setItem("list", JSON.stringify(items));
}

function getLocalStorage() {
  return JSON.parse(localStorage.getItem("list")) || [];
}

function updateLocalStorage(id, value) {
  const items = getLocalStorage().map((item) =>
    item.id === id ? { id, value } : item
  );
  localStorage.setItem("list", JSON.stringify(items));
}

function removeFromLocalStorage(id) {
  const items = getLocalStorage().filter((item) => item.id !== id);
  localStorage.setItem("list", JSON.stringify(items));
}

// Configuración inicial
function setupItems() {
  const items = getLocalStorage();
  if (items.length) {
    items.forEach((item) => createListItem(item.id, item.value));
    container.classList.add("show-container");
  }
}

// Crear elemento de la lista
function createListItem(id, value) {
  const element = document.createElement("article");
  element.classList.add("grocery-item");
  element.setAttribute("data-id", id);
  element.innerHTML = `
    <p class="title">${value}</p>
    <div class="btn-container">
        <button type="button" class="edit-btn">✏️</button>
        <button type="button" class="delete-btn">🗑️</button>
    </div>
  `;

  const deleteBtn = element.querySelector(".delete-btn");
  const editBtn = element.querySelector(".edit-btn");

  // Usar `addEventListener` con funciones predefinidas
  deleteBtn.addEventListener("click", () => deleteItem(id, element));
  editBtn.addEventListener("click", () => editItem(id, element));

  list.appendChild(element);
  container.classList.add("show-container");
}