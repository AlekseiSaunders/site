const express = require('express');

const app = express();
const PORT = process.env.PORT || 3300;

// create root route
app.get('/', (request, response) => {
  response.type('text/plain');
  response.send('Meadowlark Travel');
});

// create About route
app.get('/about', (request, response) => {
  response.type('text/plain');
  response.send('About Meadowlark Travel');
});

// custom 404 page
app.use((request, response) => {
  response.type('text/plain');
  response.status(404);
  response.send('404 - Not Found');
});

// custom 500 page
app.use((request, response) => {
  response.type('text/plain');
  response.status(500);
  response.send('500 - Server Error');
});

app.listen(PORT, () => console.log(`Server listening on PORT: ${PORT}`));
