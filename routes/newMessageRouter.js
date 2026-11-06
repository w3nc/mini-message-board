const { Router } = require("express");
const controller = require("../controllers/messageController");

const router = Router();

router.get("/", controller.getNewForm);
router.get("/reset-name", controller.resetUserName);
router.post("/", controller.postNewMessage);

module.exports = router;
