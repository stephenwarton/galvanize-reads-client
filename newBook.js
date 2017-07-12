$(appReady);

let API_URL = 'https://g-reads-api.herokuapp.com/api/v1/books';

function getUrl() {
  API_URL = 'https://g-reads-api.herokuapp.com/api/v1/books';
  if (window.location.href == 'http://127.0.0.1:8080/new_book.html') {
    API_URL = 'http://localhost:3000/api/v1/books';
  }
}

function appReady() {
  $(".button-collapse").sideNav();
  getUrl();
  addBook();
}

function addBook() {
  $('.add-book').on('click', (event) => {
    event.preventDefault();
    let bookInfo = getBookInfo();
    if (bookInfo) {
      $.post(API_URL, bookInfo)
        .then(results => {
          console.log(results);
          Materialize.toast('Success!', 3000);
        })
        .catch(error => {
          Materialize.toast(error.responseJSON.message, 3000);
        });
    }
  });
}

function getBookInfo() {
  let title = $('#title').val();
  let genre = $('#genre').val();
  let description = $('#description').val();
  let coverUrl = $('#cover-url').val();

  const validTitle = typeof title == 'string' && title.trim() != '';
  if (!validTitle) {
    Materialize.toast('Title cannot be empty', 3000);
    return false;
  } else {

    return {
      title: title,
      genre: genre,
      description: description,
      cover_url: coverUrl
    };
  }
}
