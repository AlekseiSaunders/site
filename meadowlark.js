const express = require('express');
const { engine } = require('express-handlebars');

const app = express();
const PORT = process.env.PORT || 3300;

// configure Handlebars as view engine
app.engine('hbs', engine({ defaultLayout: 'main', extname: '.hbs' }));
app.set('view engine', 'hbs');

// configure public to serve static files
app.use(express.static(__dirname + '/public'));

// create root route
app.get('/', (request, response) => {
  response.render('home');
});

// create About route
app.get('/about', (request, response) => {
  response.render('about');
});

// custom 404 page
app.use((request, response) => {
  response.status(404);
  response.render('404');
});

// custom 500 page
app.use((error, request, response, next) => {
  console.error(error.message);
  response.status(500);
  response.render('500');
});

app.listen(PORT, () => console.log(`Server listening on PORT: ${PORT}`));
