const express = require('express');
const { engine } = require('express-handlebars');
const bodyParser = require('body-parser');

const handlers = require('./lib/handlers');
const weatherMiddleware = require('./lib/middleware/weather');

const app = express();

// configure handlebars as view engine
// add helper to allow handlebars to accept sections
app.engine(
  '.hbs',
  engine({
    defaultLayout: 'main',
    extname: '.hbs',
    helpers: {
      section: function (name, options) {
        if (!this._sections) this._sections = {};
        this._sections[name] = options.fn(this);
        return null;
      },
    },
  })
);
app.set('view engine', '.hbs');
app.set('views', './views');

// configure bodyparser to reader request.body
// utilizing urlencoding and json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// set port usage in either process.env or 3500
const port = process.env.PORT || 3500;

// configure express to serve static files from /public folder
app.use(express.static(__dirname + '/public'));

// use weatherMiddleware
app.use(weatherMiddleware);

// set root route, callbacks moved to /lib/handlers
app.get('/', handlers.home);

// set routes for browser-based form submission (old way)
app.get('/newsletter-signup', handlers.newsletterSignup);
app.post('/newsletter-signup/process', handlers.newsletterSignupProcess);
app.get('/newsletter-signup/thank-you', handlers.newsletterSignupThankYou);

// set routes for fetch/JSON form submission (preferred)
app.get('/newsletter', handlers.newsletter);
app.post('/api/newsletter-signup', handlers.api.newsletterSignup);

// set routes for 404-Not Found and 500-Server Error
app.use(handlers.notFound);
app.use(handlers.serverError);

if (require.main === module) {
  app.listen(port, () => {
    console.log(
      `Express started on http://localhost:${port}` +
        `; press Ctrl-C to terminate`
    );
  });
} else {
  module.exports = app;
}
