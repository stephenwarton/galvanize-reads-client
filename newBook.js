$(appReady);

let API_URL = (window.location.hostname == "127.0.0.1") ? `http://localhost:3000/api/v1`: `https://g-reads-api.herokuapp.com/api/v1`;

function appReady() {
  $(".button-collapse").sideNav();
  populateSelect();
  addBook();
}

function addBook() {
  $('.add-book').on('click', (event) => {
    event.preventDefault();
    let bookInfo = getBookInfo();
    let authors = $('select').val();
    if(authors.length === 0){
      Materialize.toast('Book must have at least one author!', 5000);
    }
    else if (bookInfo) {
      $.post(`${API_URL}/books`, bookInfo)
        .then(results => {
          let bookId = results[0].id;
          authors.forEach(authorId => {
            let bookAuthor = {
              book_id: bookId,
              author_id: parseInt(authorId)
            }
            $.post(`${API_URL}/book_author`, bookAuthor)
              .then(results => {
                //console.log(results);
              })
              .catch(error => {
                Materialize.toast(error.responseJSON.message, 3000);
              });
          });
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
    Materialize.toast('Book must have a title!', 5000);
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

function populateSelect(){
 $('select').material_select();
 getAuthors();
}

function getAuthors(){
  $.get(`${API_URL}/authors`).then(results => {
    results.forEach(author => {
       $('select').append(`<option value="${author.id}">${author.first_name} ${author.last_name}</option>`);
    });
    $('select').material_select();
  });
}
