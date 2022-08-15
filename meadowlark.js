const express = require('express');
const { engine } = require('express-handlebars');
const { getFortune } = require('./lib/fortune');
const handlers = require('./lib/handlers');

const app = express();
const PORT = process.env.PORT || 3300;

// configure Handlebars as view engine
app.engine('hbs', engine({ defaultLayout: 'main', extname: '.hbs' }));
app.set('view engine', 'hbs');

// configure public to serve static files
app.use(express.static(__dirname + '/public'));

// create root route
app.get('/', handlers.home);

// create About route
app.get('/about', handlers.about);

// custom 404 page
app.use(handlers.notFound);

// custom 500 page
app.use(handlers.serverError);

app.listen(PORT, () => console.log(`Server listening on PORT: ${PORT}`));
