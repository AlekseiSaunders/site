const express = require('express');
const expressHandlebars = require('express-handlebars');

const app = express();
const PORT = process.env.PORT || 3300;

// configure Handlebars as view engine
app.engine('handlebars', expressHandlebars({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// create root route
app.get('/', (request, response) => {
  response.type('text/plain');
  response.render('home');
});

// create About route
app.get('/about', (request, response) => {
  response.type('text/plain');
  response.render('about');
});

// custom 404 page
app.use((request, response) => {
  response.type('text/plain');
  response.status(404);
  response.render('404');
});

// custom 500 page
app.use((request, response) => {
  response.type('text/plain');
  response.status(500);
  response.render('500');
});

app.listen(PORT, () => console.log(`Server listening on PORT: ${PORT}`));
