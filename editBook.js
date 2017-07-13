$(appReady);

let API_URL = (window.location.hostname == "127.0.0.1") ? `http://localhost:3000/api/v1`: `https://g-reads-api.herokuapp.com/api/v1`;

function appReady() {
  $(".button-collapse").sideNav();
  populateSelect();
  let id = getBookId();
  fillForm(id);
  editBook(id);
}

function editBook(id) {
  $('.book').on('click', '.edit-book', (event) => {
    event.preventDefault();
    let bookInfo = getBookInfo();
    let authors = $('select').val();
    if(authors.length === 0){
      Materialize.toast('Book must have at least one author!', 5000);
    }
    else if (bookInfo) {
      $.ajax({
        url: `${API_URL}/books/${id}`,
        type: 'PUT',
        data: bookInfo,
        success: function(result) {
        // Do something with the result
        Materialize.toast('Success!', 3000);
        window.location.href = `edit_book.html?=${id}`
        }
      });
    }
  });
}

function getBookId(){
  let currentURL = window.location.href;
  let charArray = currentURL.split('');
  let index = charArray.indexOf('=') + 1;
  let id = currentURL.substring(index);
  return id;
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

function fillForm(id){
  $.get(`${API_URL}/books/${id}`).then(results => {
    //console.log(results);
    results.forEach(book => {
      const source = $('#form-template').html();
      const template = Handlebars.compile(source);
      const html = template(book);
		$('.book').append(html);
    populateSelect();
    });
  });
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
