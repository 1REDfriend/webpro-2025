const express = require('express');
const cookieParser = require('cookie-parser');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const db = new sqlite3.Database('./customers.db', (err) => {
    if (err) console.error('Database connection error:', err.message);
});

app.get('/', (req, res) => {
    const query = `
        SELECT CustomerId, FirstName, LastName, Address, Phone, Email 
        FROM customers 
        ORDER BY RANDOM() LIMIT 1
    `;
    db.get(query, (err, row) => {
        if (err) return res.status(500).send(err.message);
        res.render('index', { employee: row || {} });
    });
});

app.post('/save-cookie', (req, res) => {
    const employeeData = req.body;

    res.cookie('employeeData', employeeData, {
        maxAge: 1000 * 60 * 60,
        httpOnly: true,
        secure: false
    });

    res.render('index', { employee: {} });
});

app.get('/show-data', (req, res) => {
    const data = req.cookies.employeeData || {};
    res.render('index', { employee: data });
});

app.get('/clear-cookie', (req, res) => {
    res.clearCookie('employeeData', {
        httpOnly: true,
        secure: false
    });
    res.render('index', { employee: {} });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});