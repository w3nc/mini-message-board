// Error handling middleware: Express knows it is one because it has 4 arguments.
// It must be registered after all routes and other app.use() calls.
function errorHandler(err, req, res, next) {
  console.error(err);
  const status = err.status || 500;
  const message = status === 500 ? "Something went wrong." : err.message;
  res.status(status).send(`<h1>${status}</h1><p>${message}</p><p><a href="/">Back to the board</a></p>`);
}

module.exports = errorHandler;
