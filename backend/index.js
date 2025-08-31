import express from "express";
import multer from "multer";
import mysql from "mysql2";
import cors from "cors";
import path from "path";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/schoolImages", express.static("schoolImages"));

// DB Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "yourpassword",
  database: "yourdbname",
});

// Multer storage for images
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "schoolImages");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// API: Add School
app.post("/api/schools", upload.single("image"), (req, res) => {
  const { name, address, city, state, contact, email_id } = req.body;
  const imagePath = req.file ? `/schoolImages/${req.file.filename}` : null;

  const sql =
    "INSERT INTO schools (name, address, city, state, contact, image, email_id) VALUES (?, ?, ?, ?, ?, ?, ?)";
  db.query(
    sql,
    [name, address, city, state, contact, imagePath, email_id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "School added successfully" });
    }
  );
});

// API: Get Schools
app.get("/api/schools", (req, res) => {
  db.query("SELECT id, name, address, city, image FROM schools", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
