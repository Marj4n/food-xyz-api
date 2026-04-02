const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const { username, password, nama, alamat, telpon } = req.body;

  const hashed = await bcrypt.hash(password, 10);

  db.query(
    "INSERT INTO users (username, password, name, address, phone) VALUES (?, ?, ?, ?, ?)",
    [username, hashed, nama, alamat, telpon],
    (err, result) => {
      if (err) return res.status(500).json({ message: err });

      res.json({ message: "Register berhasil" });
    },
  );
};

exports.login = (req, res) => {
  const { username, password } = req.body;

  db.query(
    "SELECT * FROM users WHERE username = ?",
    [username],
    async (err, results) => {
      if (results.length === 0)
        return res.status(401).json({ message: "User tidak ditemukan" });

      const user = results[0];
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) return res.status(401).json({ message: "Password salah" });

      const token = jwt.sign({ id: user.id }, "SECRET_KEY");

      res.json({
        status: 200,
        message: "Login berhasil",
        data: token,
      });
    },
  );
};

exports.whoami = (req, res) => {
  const userId = req.user.id;

  db.query(
    "SELECT id, username, name, address, phone FROM users WHERE id = ?",
    [userId],
    (err, results) => {
      if (err) return res.status(500).json({ message: err });

      if (results.length === 0) {
        return res.status(404).json({ message: "User tidak ditemukan" });
      }

      res.json(results[0]);
    }
  );
};