const router = require("express").Router();
// const authMiddleware = require("../middleware/auth.middleware");
const controller = require("../controllers/auth.controller");

router.get("/login",  controller.login);
router.get("/me", controller.me);

module.exports = router;