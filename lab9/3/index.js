
const express = require("express");
const path = require("path");
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

const dbOrder = new sqlite3.Database('./orders.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) return console.error(err.message);
    console.log('Connected to orders.db');
});

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    const sql = "SELECT * FROM orders";
    dbOrder.all(sql, [], (err, rows) => {
        if (err) {
            return console.error(err.message);
        }
        res.render('orders', { orders: rows });
    });
});

app.post('/add', (req, res) => {
    const { name, product, address, phone } = req.body;
    const status = "รอดำเนินการ";

    const sql = "INSERT INTO orders (name, product, address, phone, status) VALUES (?, ?, ?, ?, ?)";
    dbOrder.run(sql, [name, product, address, phone, status], (err) => {
        if (err) {
            return console.error(err.message);
        }
        res.redirect('/');
    });
});

app.post('/update', (req, res) => {
    const { id, status } = req.body;

    const sql = "UPDATE orders SET status = ? WHERE id = ?";
    dbOrder.run(sql, [status, id], (err) => {
        if (err) {
            return console.error(err.message);
        }
        res.redirect('/');
    });
});

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});