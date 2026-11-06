// Reads the saved username from the browser cookie, so a person only
// types their name once and can send messages any time after that.
function currentUser(req, res, next) {
  const cookies = req.headers.cookie || "";
  const match = cookies.match(/username=([^;]+)/);
  res.locals.user = match ? decodeURIComponent(match[1]) : null;
  next();
}

module.exports = currentUser;
