const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const cors = require("cors");
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);
// Database connection
const db = mysql.createConnection({
  host: "localhost",
  user: "santhosh",
  password: "Shranya_44",
  database: "customer_db",
});

db.connect((err) => {
  if (err) {
    console.log("Error connecting to Database", err.message);
    return;
  }
  console.log("Connected to database");
});

// Home page
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// View all customers
app.get("/customers", (req, res) => {
  let sql = "SELECT * FROM customers";
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.status(200).send(results);
  });
});

// View a single customer
app.get("/customers/:id", (req, res) => {
  let sql = "SELECT * FROM customers WHERE id = ?";
  db.query(sql, [req.params.id], (err, result) => {
    if (err) throw err;
    res.status(200).send(result[0]);
  });
});

// Transfer money form
app.get("/transfer/:id", (req, res) => {
  let sql = "SELECT * FROM customers WHERE id = ?";
  db.query(sql, [req.params.id], (err, result) => {
    if (err) throw err;
    let sql2 = "SELECT * FROM customers WHERE id != ?";
    db.query(sql2, [req.params.id], (err2, results) => {
      if (err2) throw err2;
      res.status(200).json({ customer: result[0], customers: results });
    });
  });
});

// Handle money transfer
app.post("/transfer/:id", (req, res) => {
  const senderId = req.params.id;
  const { receiverId, amount } = req.body;

  if (amount <= 0) {
    res.json({ error: "Invalid amount" });
    return;
  }

  db.beginTransaction((err) => {
    if (err) throw err;

    const sql1 = "SELECT balance FROM customers WHERE id = ?";
    db.query(sql1, [senderId], (err, results) => {
      if (err)
        return db.rollback(() => {
          throw err;
        });

      const senderBalance = results[0].balance;
      if (senderBalance < amount) {
        res.json({ error: "Insufficient balance" });
        return db.rollback(() => {});
      }

      const sql2 = "UPDATE customers SET balance = balance - ? WHERE id = ?";
      db.query(sql2, [amount, senderId], (err) => {
        if (err)
          return db.rollback(() => {
            throw err;
          });

        const sql3 = "UPDATE customers SET balance = balance + ? WHERE id = ?";
        db.query(sql3, [amount, receiverId], (err) => {
          if (err)
            return db.rollback(() => {
              throw err;
            });

          const sql4 =
            "INSERT INTO transfers (sender_id, receiver_id, amount) VALUES (?, ?, ?)";
          db.query(sql4, [senderId, receiverId, amount], (err) => {
            if (err)
              return db.rollback(() => {
                throw err;
              });

            db.commit((err) => {
              if (err)
                return db.rollback(() => {
                  throw err;
                });
              res.status(200).json({ message: "Successfully Transferred" });
            });
          });
        });
      });
    });
  });
});
// Start server
// const PORT = process.env.PORT || 5000;
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
