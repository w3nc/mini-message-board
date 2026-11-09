const AppError = require("../errors/AppError");

// Runs when no route matched the request, and passes a 404 error on.
function notFound(req, res, next) {
  next(new AppError("Page not found", 404));
}

module.exports = notFound;
