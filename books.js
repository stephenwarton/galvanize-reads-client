$(appReady);

let API_URL = (window.location.hostname == "127.0.0.1") ? `http://localhost:3000/api/v1`: `https://g-reads-api.herokuapp.com/api/v1`;

function appReady() {
  $(".button-collapse").sideNav();
  getBooks();
}

function getBooks(){
  //console.log(API_URL);
  $.get(`${API_URL}/books`).then(results => {
    results.forEach(book => {
      const source = $('#book-template').html();
      const template = Handlebars.compile(source);
      const html = template(book);
		$('.books').append(html);
    });
  });
}
