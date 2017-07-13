$(appReady);

let API_URL = (window.location.hostname == "127.0.0.1") ? `http://localhost:3000/api/v1`: `https://g-reads-api.herokuapp.com/api/v1`;

function appReady() {
  $(".button-collapse").sideNav();
  let bookId = getBookId();
  getBook(bookId);
  deleteBook(bookId);
}

function getBook(id){
  //console.log(API_URL);
  $.get(`${API_URL}/books/${id}`).then(results => {
    results.forEach(book => {
      const source = $('#book-template').html();
      const template = Handlebars.compile(source);
      const html = template(book);
		$('.books').append(html);
    });
  });
}

function getBookId(){
  let currentURL = window.location.href;
  let charArray = currentURL.split('');
  let index = charArray.indexOf('=') + 1;
  let id = currentURL.substring(index);
  return id;
}

function deleteBook(id){
    $('.books').on('click', '.delete', (event) => {
      event.preventDefault();
      $.ajax({
        url: `${API_URL}/books/${id}`,
        type: 'DELETE',
        success: function(result) {
          Materialize.toast('DELETED', 3000);
          window.location.href = 'books.html';
        },
        error: function(result){
          Materialize.toast('Uhhh, something bad happened', 3000);
        }
      });
    });
  }
