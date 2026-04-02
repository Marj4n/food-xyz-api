const db = require("../config/db");

exports.addToCart = (req, res) => {
  const { product_id, quantity } = req.body;
  const user_id = req.user.id;

  db.query(
    "INSERT INTO cart_items (user_id, product_id, quantity) VALUES (?, ?, ?)",
    [user_id, product_id, quantity],
    () => {
      res.json({ message: "Added to cart" });
    },
  );
};

exports.getCart = (req, res) => {
  const user_id = req.user.id;

  db.query(
    `SELECT c.*, p.productName, p.price 
     FROM cart_items c
     JOIN products p ON c.product_id = p.id
     WHERE c.user_id = ?`,
    [user_id],
    (err, result) => {
      res.json(result);
    },
  );
};
