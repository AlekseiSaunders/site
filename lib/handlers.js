// const app = require("../meadowlark");

exports.api = {};

exports.home = (request, response) => response.render('home');

// handlers for browser submitted form
exports.newsletterSignup = (request, response) =>
  response.render('newsletter-signup', { csrf: 'CSRF token goes here' });

exports.newsletterSignupProcess = (request, response) => {
  console.log('CSRF token (from hidden form field):' + request.body._csrf);
  console.log('Name (from visible Name field:' + request.body.name);
  console.log('Email (from visible Email field:' + request.body.email);
  response.redirect(303, '/newsletter-signup-thank-you');
};

exports.newsletterSignupThankYou = (request, response) =>
  response.render('newsletter-signup-thank-you');
// end handlers for browser submitted form

// handlers for fetch/JSON submitted form
exports.newsletter = (request, response) => {
  response.render('newsletter', { csrf: 'CSRF token goes here' });
};

exports.api.newsletterSignup = (request, response) => {
  console.log('CSRF token (from hidden form field):' + request.body._csrf);
  console.log('Name (from visible Name field):' + request.body.name);
  console.log('Email (from visible Email field):' + request.body.email);
  response.send({ result: 'success' });
};
// end handlers for fetch/JSON submitted form

// handler for photo contest submission
exports.vacationPhotoContest = (request, response) => {
  const now = new Date();
  response.render('contest/vacation-photo', {
    year: now.getFullYear(),
    month: now.getMonth(),
  });
};

exports.vacationPhotoContestProcess = (request, response, fields, files) => {
  console.log('field data', fields);
  console.log('files', files);
  response.redirect(303, '/contest/vacation-photo-thank-you');
};

exports.vacationPhotoContestProcessThankYou = (request, response) => {
  response.render('contest/vacation-photo-thank-you');
};

exports.notFound = (request, response) => {
  response.render('404');
};

// Express recognizes the error handler by way of its four
// arguments, so we have to disable ESLint's no-unused-vars rule
/* eslint-disable no-unused-vars */
exports.serverError = (err, request, response, next) => response.render('500');
/* eslint-enable no-unused-vars */
