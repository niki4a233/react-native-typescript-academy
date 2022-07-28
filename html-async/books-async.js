function generateBook(book) {
  const resultsElem = document.getElementById(`results`);
  const art = document.createElement("article");
  console.log(art);
  art.innerHTML = `
  <h1>${book.volumeInfo.title}</h1>
  <h5> ${book.volumeInfo.authors} </h5>
  <div class="fakeimg">
      <img src="${book.volumeInfo.imageLinks.thumbnail}"></img>
  <div class="blogtext">
  <p>${book.volumeInfo.description}</p>
 
  </div>

    `;
    return art;
}

async function init() {
  try {
    const resultsElem = document.getElementById(`results`);
    const booksResp = await fetch("https://www.googleapis.com/books/v1/volumes?q=react+native&maxResults=10");
    const books = await booksResp.json();
    books.items.forEach((element) => {
      resultsElem.appendChild(generateBook(element));
    });

    console.log(books);
    // const images = booksApi.map((books) => {
    //   const img = new Image();
    //   img.src ="http://books.google.com/books/content?id=0DidDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api";
    //   // resultsElem.appendChild(img);
    //   resultsElem.insertAdjacentElement(`beforeend`, img);
    //   return img;
    // });
    // await new Promise((resolve, reject) => {
    //   setTimeout(resolve, 10000);
    // });
    // images.forEach((img) => resultsElem.removeChild(img));
  } catch (err) {
    console.log(`Error`, err);
  } finally {
    console.log(`Demo finished`);
  }
}

init();
