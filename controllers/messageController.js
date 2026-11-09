const {
  getAllMessages,
  getMessagesByUser,
  getMessageById,
  addMessage
} = require("../models/messages");
const { validateMessage } = require("../validators/messageValidator");

// One year, so the saved username lasts a long time.
const NAME_COOKIE_AGE = 365 * 24 * 60 * 60 * 1000;

// Home page: list every message.
async function getHome(req, res) {
  const messages = await getAllMessages();
  res.render("index", {
    title: "Mini Messageboard",
    messages: messages,
    currentUser: res.locals.user
  });
}

// One message's details page.
async function getMessage(req, res) {
  const message = await getMessageById(Number(req.params.id));
  if (!message) {
    return res.status(404).send("Message not found");
  }
  res.render("message", {
    title: "Message",
    message: message,
    currentUser: res.locals.user
  });
}

// Show the form for writing a new message.
// The name field only appears the first time, before a name is saved.
function getNewForm(req, res) {
  res.render("form", {
    title: "New Message",
    currentUser: res.locals.user,
    error: null,
    text: ""
  });
}

// Save the new message, then go back to the home page.
async function postNewMessage(req, res) {
  const savedName = res.locals.user;
  const check = validateMessage(req.body);

  // A name and some text are both needed.
  if (!check.ok) {
    return res.status(400).render("form", {
      title: "New Message",
      currentUser: savedName,
      error: check.error,
      text: (req.body.messageText || "").slice(0, 500)
    });
  }

  const userName = savedName || check.userName;

  if (!userName) {
    return res.status(400).render("form", {
      title: "New Message",
      currentUser: null,
      error: "Put your name in first.",
      text: check.text
    });
  }

  // Set the name once, then remember it in the browser from now on.
  if (!savedName) {
    res.cookie("username", userName, {
      maxAge: NAME_COOKIE_AGE,
      httpOnly: true,
      sameSite: "lax"
    });
  }

  await addMessage(userName, check.text);
  res.redirect("/");
}

// Forget the saved name, so the person can pick a new one.
function resetUserName(req, res) {
  res.clearCookie("username");
  res.redirect("/new");
}

// Show only the messages written by one user, e.g. /users/Amando.
async function getUserMessages(req, res) {
  const userName = req.params.name;
  const userMessages = await getMessagesByUser(userName);
  res.render("index", {
    title: `Messages from ${userName}`,
    messages: userMessages,
    currentUser: res.locals.user
  });
}

module.exports = {
  getHome,
  getMessage,
  getNewForm,
  postNewMessage,
  resetUserName,
  getUserMessages
};
