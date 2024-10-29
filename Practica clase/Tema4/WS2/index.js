// Clase Book y BookList
class Book {
  constructor(title, genre, author) {
    this.title = title;
    this.genre = genre;
    this.author = author;
    this.read = false;
    this.readDate = null;
  }

  markAsRead() {
    this.read = true;
    this.readDate = new Date();
  }
}

class BookList {
  constructor() {
    this.books = [];
    this.readCount = 0;
    this.unreadCount = 0;
    this.currentBook = null;
    this.lastBookRead = null;
  }

  add(book) {
    this.books.push(book);
    this.unreadCount++;
    if (!this.currentBook) {
      this.currentBook = book;
    }
  }

  finishCurrentBook() {
    if (this.currentBook) {
      this.currentBook.markAsRead();
      this.readCount++;
      this.unreadCount--;
      this.lastBookRead = this.currentBook;

      const nextBookIndex = this.books.findIndex((book) => !book.read);
      this.currentBook =
        nextBookIndex !== -1 ? this.books[nextBookIndex] : null;
    }
  }
}

// Instancia global de BookList
const bookList = new BookList();

function addBook() {
  const title = document.getElementById("title").value;
  const genre = document.getElementById("genre").value;
  const author = document.getElementById("author").value;

  if (title && genre && author) {
    const book = new Book(title, genre, author);
    bookList.add(book);
    updateUI();

    // Limpiar campos de entrada
    document.getElementById("title").value = "";
    document.getElementById("genre").value = "";
    document.getElementById("author").value = "";
  } else {
    alert("Please fill in all fields.");
  }
}

function finishCurrentBook() {
  bookList.finishCurrentBook();
  updateUI();
}

function updateUI() {
  // Actualizar información del libro actual
  const currentBookElement = document.getElementById("current-book");
  if (bookList.currentBook) {
    currentBookElement.innerText = `Title: ${bookList.currentBook.title}, Author: ${bookList.currentBook.author}`;
  } else {
    currentBookElement.innerText = "No current book selected.";
  }

  // Listas de libros leídos y no leídos
  const unreadList = document.getElementById("unread-list");
  const readList = document.getElementById("read-list");

  unreadList.innerHTML = "Unread Books:";
  readList.innerHTML = "Read Books:";

  bookList.books.forEach((book) => {
    const li = document.createElement("li");
    li.innerText = `Title: ${book.title}, Author: ${book.author}`;

    if (book.read) {
      li.innerText += ` (Read on: ${book.readDate.toDateString()})`;
      readList.appendChild(li);
    } else {
      unreadList.appendChild(li);
    }
  });
}
