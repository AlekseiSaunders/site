const fortune = require('./fortune');

// create handlers for routes

exports.home = (request, response) => response.render('home');

exports.about = (request, response) =>
  response.render('about', { fortune: fortune.getFortune() });

exports.notFound = (request, response) => response.render('404');

exports.serverError = (error, request, response, next) =>
  response.render('500');
