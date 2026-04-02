const router = require("express").Router();
const { login, register, whoami } = require("../controllers/auth.controller");
const authMiddleware = require("../middleware/auth.middleware");

router.post("/login", login);
router.post("/daftar", register);
router.get("/whoami", authMiddleware, whoami);

module.exports = router;
