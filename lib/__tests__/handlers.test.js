const handlers = require('../handlers');

// test the home page route and rendering
test('home page renders', () => {
  const req = {};
  // use the generic jest method .fn to create a mock function to track how it is called
  const res = { render: jest.fn() };
  handlers.home(req, res);
  // assertion = code should call render method once, called with home
  expect(res.render.mock.calls[0][0]).toBe('home');
});

// test the about page route and rendering
test('about page renders', () => {
  const req = {};
  const res = { render: jest.fn() };
  handlers.about(req, res);
  // additional assertion to test if fortune string is being added to response
  expect(res.render.mock.calls.length).toBe(1);
  expect(res.render.mock.calls[0][0]).toBe('about');
  expect(res.render.mock.calls[0][1]).toEqual(
    expect.objectContaining({
      fortune: expect.stringMatching(/\W/),
    })
  );
});

// test the 404 notFound page route and rendering
test('404 Not Found page renders', () => {
  const req = {};
  const res = { render: jest.fn() };
  handlers.notFound(req, res);
  expect(res.render.mock.calls.length).toBe(1);
  expect(res.render.mock.calls[0][0]).toBe('404');
});

// test the 500 serverError page route and rendering
test('500 Server Error page renders', () => {
  const err = new Error('some error');
  const req = {};
  const res = { render: jest.fn() };
  const next = jest.fn();
  handlers.serverError(err, req, res, next);
  expect(res.render.mock.calls.length).toBe(1);
  expect(res.render.mock.calls[0][0]).toBe('500');
});
