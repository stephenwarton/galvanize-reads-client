$(appReady);

let API_URL = 'https://g-reads-api.herokuapp.com/api/v1/books';

function getUrl() {
	API_URL = 'https://g-reads-api.herokuapp.com/api/v1/books';
	if(window.location.href == 'http://127.0.0.1:8080/books.html' || window.location.href == 'http://127.0.0.1:8080/index.html') {
		API_URL = 'http://localhost:3000/api/v1/books';
	}
}

function appReady() {
  getUrl();
  getBooks();
}

function getBooks(){
  $.get(API_URL).then(results => {
    results.forEach(book => {
      const source = $('#book-template').html();
      const template = Handlebars.compile(source);
      const html = template(book);
		$('body').append(html);
    });
  });
}
