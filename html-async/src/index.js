"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleSubmit = exports.cutString = void 0;
const favorite_books_client_js_1 = require("./favorite-books-client.js");
const searchForm = document.getElementById("search");
const mainDiv = document.getElementById("main");
const favoritesDiv = document.getElementById("favorites-section");
searchForm.addEventListener("submit", handleSubmit.bind(this));
class BookController {
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield bookControl.fetchBooks("../book.json");
                yield this.fetchFavoriteBooks();
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    addBookToMain(book) {
        const newArticle = bookControl.createBookCard(book, "main");
        mainDiv.insertAdjacentElement("beforeend", newArticle);
        const btn = document.getElementById(`favorite-${book.id}`);
        btn.addEventListener("click", () => this.makeFavorite(book));
    }
    addBookToFavorite(book) {
        const newArticle = bookControl.createBookCard(book, "fav");
        favoritesDiv.insertAdjacentElement("beforeend", newArticle);
        const btn = document.getElementById(`delete-${book.id}`);
        btn.addEventListener("click", () => this.deleteFromFavorites(book));
    }
    isFavorite(book) {
        return __awaiter(this, void 0, void 0, function* () {
            const findBook = yield favorite_books_client_js_1.favoriteBooksAPI.getAllFavorites();
            for (const bk of findBook) {
                if (bk.id === book.id) {
                    return true;
                }
            }
            return false;
        });
    }
    makeFavorite(book) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (yield this.isFavorite(book)) {
                    this.deleteFromFavorites(book);
                }
                else {
                    yield favorite_books_client_js_1.favoriteBooksAPI.addToFavorite(book);
                    this.addBookToFavorite(book);
                }
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    deleteFromFavorites(book) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield favorite_books_client_js_1.favoriteBooksAPI.deleteById(book.id);
                const favoriteArticle = document.getElementById(`book-fav-${book.id}`);
                favoriteArticle.remove();
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    createBookCard(book, dest) {
        //dest is only main or fav
        //const outerDiv = document.getElementById("main") as HTMLElement;
        const newArticle = document.createElement("article");
        const description = cutString(book.volumeInfo.description);
        newArticle.setAttribute("id", `book-${dest}-${book.id}`);
        newArticle.innerHTML = `<section class="image">
    <img src="${book.volumeInfo.imageLinks.thumbnail}" alt="" />
  </section>
  <section class="content">
  <section class="content-title">
    <h5>${book.volumeInfo.title}</h5><button type="click" class="favorite" id="${dest === "main" ? "favorite" : "delete"}-${book.id}">
          <i class="fa fa-${dest === "main" ? "star" : "trash"}"></i>
        </button>
     </section>
    <h6>Autors: ${book.volumeInfo.authors}</h6>
    <p>
    ${description}
    </p>
    
  </section>`;
        return newArticle;
    }
    fetchBooks(url) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const booksResp = yield fetch(url);
                //const booksResp = await fetch("book.json");
                //const booksResp = await fetch("https://www.googleapis.com/books/v1/volumes?q=react+native&maxResults=9");
                const booksArr = yield booksResp.json();
                const books = booksArr.items;
                books.forEach((element) => {
                    this.addBookToMain(element);
                });
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    fetchFavoriteBooks() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const books = yield favorite_books_client_js_1.favoriteBooksAPI.getAllFavorites();
                //const booksResp = await fetch("book.json");
                //const booksResp = await fetch("https://www.googleapis.com/books/v1/volumes?q=react+native&maxResults=9");
                // const booksArr = await booksResp.json();
                //const books = booksArr.books as ApiBook[];
                books.forEach((element) => {
                    this.addBookToFavorite(element);
                });
            }
            catch (err) {
                console.log(err);
            }
        });
    }
}
function cutString(description) {
    if (description === undefined) {
        return "No description available";
    }
    description = description.slice(0, 100);
    const last = description.lastIndexOf(" ");
    return description.slice(0, last) + "...";
}
exports.cutString = cutString;
const bookControl = new BookController();
bookControl.init();
function handleSubmit(event) {
    event.preventDefault();
    const input = document.getElementById("search-input");
    console.log(input.value);
    const encodeValue = encodeURIComponent(input.value);
    mainDiv.innerHTML = "";
    searchForm.reset();
    const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeValue}&maxResults=9`;
    bookControl.fetchBooks(url);
}
exports.handleSubmit = handleSubmit;
// async function searchBooks(url: string) {
//   //const booksResp = await fetch("book.json");
//   //const booksResp = await fetch("https://www.googleapis.com/books/v1/volumes?q=react+native&maxResults=9");
//   const booksResp = await fetch(url);
//   const booksArr = await booksResp.json();
//   const books = booksArr.items as ApiBook[];
//   books.forEach((element: ApiBook) => {
//     createBook(element);
//   });
// }
