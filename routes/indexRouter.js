const { Router } = require("express");
const controller = require("../controllers/messageController");

const router = Router();

router.get("/", controller.getHome);
router.get("/messages/:id", controller.getMessage);

module.exports = router;
