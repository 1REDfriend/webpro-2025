const express = require("express");
const path = require("path");
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = 3000;

const db = new sqlite3.Database('./userdata.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) return console.error(err.message);
    console.log('Connected to the userdata.db database.');
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
    const sql = "SELECT * FROM users";
    db.all(sql, [], (err, rows) => {
        if (err) {
            return console.error(err.message);
        }
        res.render('index', { users: rows });
    });
});

app.get('/user/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM users WHERE id = ?";

    db.get(sql, [id], (err, row) => {
        if (err) {
            return console.error(err.message);
        }
        res.render('detail', { user: row });
    });
});

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});