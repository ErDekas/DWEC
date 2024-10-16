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
            this.currentBook = book; // Set the first book as current
        }
    }

    finishCurrentBook() {
        if (this.currentBook) {
            this.currentBook.markAsRead();
            this.readCount++;
            this.unreadCount--;
            this.lastBookRead = this.currentBook;

            // Set next book to read
            const nextBookIndex = this.books.findIndex(book => !book.read);
            this.currentBook = nextBookIndex !== -1 ? this.books[nextBookIndex] : null;
        }
    }
}

// Example usage
const myBookList = new BookList();
const book1 = new Book('1984', 'Dystopian', 'George Orwell');
const book2 = new Book('The Hobbit', 'Fantasy', 'J.R.R. Tolkien');

myBookList.add(book1);
myBookList.add(book2);
myBookList.finishCurrentBook(); // Mark '1984' as read
console.log(myBookList);
