const fortune = require('./fortune');

// create handlers for routes

exports.home = (request, response) => response.render('home');

exports.about = (request, response) =>
  response.render('about', { fortune: fortune.getFortune() });

exports.notFound = (request, response) => response.render('404');

//Express recognizes the error handler by way of its four
//arguments, so we have to disable ESLint's no-unused-vars rule
/* eslint-disable no-unused-vars */
exports.serverError = (error, request, response, next) =>
  response.render('500');
/*eslint-enable no-unused-vars */
