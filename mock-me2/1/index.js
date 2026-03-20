const express = require("express");
const path = require("path");
const port = 3000;
const sqlite3 = require('sqlite3').verbose();

// Creating the Express server
const app = express();

// Connect to SQLite database
let db = new sqlite3.Database('your-db-filename.db', (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to the SQlite database.');
});


// static resourse & templating engine
app.use(express.static('public'));
// Set EJS as templating engine
app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, 'views'));


// routing path
app.get('/', (req, res) => {
    const endpoint = 'http://10.110.194.140:8000/menu'
    fetch(endpoint)
        .then(response => response.json())
        .then(empl => {
            res.render('home', { data: empl });
        })
        .catch(e => {
            console.error(e);
        })
})


app.get('/menu/:id', (req, res) => {
    const endpoint = `http://10.110.194.140:8000/items/${req.params.id}`;
    console.log(endpoint);
    fetch(endpoint)
        .then(response => response.json())
        .then(empl => {
            res.render('menu', { data: empl });
        })
        .catch(e => {
            console.error(e);
        })
})

app.get('/cart', (req, res) => {
    db.all('SELECT * FROM cart', (err, rows) => {
        if (err) {
            console.error(err.message);
        } else {
            console.log(rows[0])
            res.render('cart', { data: rows });
        }
    })
})

app.get('/cart/add/:id', (req, res) => {
    const endpoint = `http://10.110.194.140:8000/items/${req.params.id}`;
    console.log(endpoint);
    fetch(endpoint)
        .then(response => response.json())
        .then(empl => {
            db.all(`INSERT INTO cart (menu_id, menu_name, menu_description, menu_price, menu_image) VALUES (? ,?, ? ,? ,?)`, [empl.id, empl.name, empl.description, empl.price, empl.image], (err) => {
                if (err) {
                    console.error("Insert Error:", err.message);
                    return res.status(500).send("Database Error");
                }
                res.redirect('/cart');
            });
        })
        .catch(e => {
            console.error(e);
        })
})

app.get('/cart/delete/:id', (req, res) => {
    db.all('DELETE FROM cart WHERE id=?', req.params.id, (err) => {
        if (err) {
            console.error("Insert Error:", err.message);
            return res.status(500).send("Database Error");
        }
        res.redirect('/cart');
    })
})


// Starting the server
app.listen(port, () => {
    console.log("Server started. http://localhost:3000");
});