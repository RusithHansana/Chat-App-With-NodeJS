const path = require("path");

function getChatPage(req, res) {
  return res.sendFile(path.join(__dirname, "../public", "chat.html"));
}

module.exports = { getChatPage };
