import {
  favoriteBooksAPI,
  FavoriteBooksApiClientImpl,
} from "./favorite-books-client.js";
import { ApiBook, BooksResponse } from "./google-books-api-types.js";

const searchForm = document.getElementById("search") as HTMLFormElement;
const mainDiv = document.getElementById("main") as HTMLElement;
const favoritesDiv = document.getElementById(
  "favorites-section"
) as HTMLElement;

searchForm.addEventListener("submit", handleSubmit.bind(this));

class BookController {
  async init() {
    try {
      await bookControl.fetchBooks("../book.json");
      await this.fetchFavoriteBooks();
    } catch (err) {
      console.log(err as string);
    }
  }
  addBookToMain(book: ApiBook) {
    const newArticle = bookControl.createBookCard(book, "main");
    mainDiv.insertAdjacentElement("beforeend", newArticle);
    const btn = document.getElementById(
      `favorite-${book.id}`
    ) as HTMLButtonElement;

    btn.addEventListener("click", () => this.makeFavorite(book));
  }
  addBookToFavorite(book: ApiBook) {
    const newArticle = bookControl.createBookCard(book, "fav");
    favoritesDiv.insertAdjacentElement("beforeend", newArticle);
    const btn = document.getElementById(
      `delete-${book.id}`
    ) as HTMLButtonElement;
    btn.addEventListener("click", () => this.deleteFromFavorites(book));
  }
  async isFavorite(book: ApiBook) {
    const findBook = (await favoriteBooksAPI.getAllFavorites()) as ApiBook[];

    for (const bk of findBook) {
      if (bk.id === book.id) {
        return true;
      }
    }
    return false;
  }
  async makeFavorite(book: ApiBook) {
    try {
      if (await this.isFavorite(book)) {
        this.deleteFromFavorites(book);
      } else {
        await favoriteBooksAPI.addToFavorite(book);
        this.addBookToFavorite(book);
      }
    } catch (err) {
      console.log(err as string);
    }
  }
  async deleteFromFavorites(book: ApiBook) {
    try {
      await favoriteBooksAPI.deleteById(book.id);
      const favoriteArticle = document.getElementById(
        `book-fav-${book.id}`
      ) as HTMLElement;
      favoriteArticle.remove();
    } catch (err) {
      console.log(err as string);
    }
  }
  createBookCard(book: ApiBook, dest: string) {
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
    <h5>${
      book.volumeInfo.title
    }</h5><button type="click" class="favorite" id="${
      dest === "main" ? "favorite" : "delete"
    }-${book.id}">
          <i class="fa-thin fa-alien"-${
            dest === "main" ? "star" : "trash"
          }"></i>
        </button>
     </section>
    <h6>Autors: ${book.volumeInfo.authors}</h6>
    <p>
    ${description}
    </p>
    
  </section>`;

    return newArticle;
  }
  async fetchBooks(URL: string) {
    try {
      const booksResp = await fetch(URL);
      //const booksResp = await fetch("book.json");
      //const booksResp = await fetch("https://www.googleapis.com/books/v1/volumes?q=react+native&maxResults=9");
      const booksArr = await booksResp.json();
      const books = booksArr.items as ApiBook[];
      books.forEach((element: ApiBook) => {
        this.addBookToMain(element);
      });
    } catch (err) {
      console.log(err);
    }
  }

  async fetchFavoriteBooks() {
    try {
      const books = await favoriteBooksAPI.getAllFavorites();
      //const booksResp = await fetch("book.json");
      //const booksResp = await fetch("https://www.googleapis.com/books/v1/volumes?q=react+native&maxResults=9");
      // const booksArr = await booksResp.json();
      //const books = booksArr.books as ApiBook[];
      books.forEach((element: ApiBook) => {
        this.addBookToFavorite(element);
      });
    } catch (err) {
      console.log(err);
    }
  }
}

export function cutString(description: string) {
  if (description === undefined) {
    return "No description available";
  }
  description = description.slice(0, 100);
  const last = description.lastIndexOf(" ");
  return description.slice(0, last) + "...";
}

const bookControl = new BookController();
bookControl.init();

export function handleSubmit(event: SubmitEvent) {
  event.preventDefault();
  const input = document.getElementById("search-input") as HTMLInputElement;
  console.log(input.value);
  const encodeValue = encodeURIComponent(input.value);

  mainDiv.innerHTML = "";
  searchForm.reset();
  const URL = `https://www.googleapis.com/books/v1/volumes?q=${encodeValue}&maxResults=9`;
  bookControl.fetchBooks(URL);
}

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
