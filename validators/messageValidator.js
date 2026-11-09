// Server-side rules for the message form. The browser can be bypassed,
// so every check happens here too.
const MAX_NAME = 40;
const MAX_TEXT = 500;

function validateMessage(body) {
  const userName = (body.messageUser || "").trim();
  const text = (body.messageText || "").trim();

  if (!text) {
    return { ok: false, error: "Write something before sending." };
  }

  if (text.length > MAX_TEXT) {
    return { ok: false, error: `A message can be at most ${MAX_TEXT} characters.` };
  }

  if (userName.length > MAX_NAME) {
    return { ok: false, error: `A name can be at most ${MAX_NAME} characters.` };
  }

  return { ok: true, userName, text };
}

module.exports = { validateMessage, MAX_NAME, MAX_TEXT };
