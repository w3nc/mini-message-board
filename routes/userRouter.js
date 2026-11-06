const { Router } = require("express");
const controller = require("../controllers/messageController");

const router = Router();

router.get("/:name", controller.getUserMessages);

module.exports = router;
