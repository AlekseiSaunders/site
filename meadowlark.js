const express = require('express');
const { engine } = require('express-handlebars');
const handlers = require('./lib/handlers');
const weatherMiddleware = require('./lib/middleware/weather');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3300;

// configure Handlebars as view engine
app.engine(
  'hbs',
  engine({
    defaultLayout: 'main',
    extname: '.hbs',
    partialsDir: 'views/partials',
    helpers: {
      section: function (name, options) {
        if (!this._sections) this._sections = {};
        this._sections[name] = options.fn(this);
        return null;
      },
    },
  })
);
app.set('view engine', 'hbs');

// configure public to serve static files
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({ extended: true }));

// create root route
app.get('/', handlers.home);
app.get('/section-test', handlers.sectionTest);

// create About route
app.get('/about', handlers.about);

// custom 404 page
app.use(handlers.notFound);

// custom 500 page
app.use(handlers.serverError);

app.use(weatherMiddleware);

// allow app to be required as module for testing with puppeteer
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server listening on PORT: ${PORT}`);
  });
} else {
  module.exports = app;
}
