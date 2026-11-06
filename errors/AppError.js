// A small error type that carries an HTTP status code, e.g. 404.
class AppError extends Error {
  constructor(message, status = 500) {
    super(message);
    this.name = "AppError";
    this.status = status;
  }
}

module.exports = AppError;
