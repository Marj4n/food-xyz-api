const router = require("express").Router();
const auth = require("../middleware/auth.middleware");
const { addToCart, getCart } = require("../controllers/cart.controller");

router.post("/", auth, addToCart);
router.get("/", auth, getCart);

module.exports = router;
