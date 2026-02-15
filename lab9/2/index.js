const express = require("express");
const path = require("path");
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

const dbQuiz = new sqlite3.Database('./questions.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) return console.error(err.message);
    console.log('Connected to questions.db');
});

app.get('/', (req, res) => {
    const sql = "SELECT * FROM questions";
    dbQuiz.all(sql, [], (err, rows) => {
        if (err) {
            return console.error(err.message);
        }
        res.render('quiz', { questions: rows });
    });
});

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});