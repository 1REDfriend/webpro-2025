const express = require('express');
const session = require('express-session');
const path = require('path');

const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// การตั้งค่า Session
app.use(session({
    secret: 'restaurant-secret-key-2026',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 }
}));

app.use((req, res, next) => {
    if (!req.session.cart) {
        req.session.cart = [];
    }
    next();
});

app.get(['/', '/menu'], async (req, res) => {
    try {
        const response = await fetch('http://webdev.it.kmitl.ac.th:4000/restaurant');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const data = await response.json();
        res.render('menu', { foods: data });
    } catch (error) {
        console.error('Error fetching menu:', error);
        res.status(500).send('เกิดข้อผิดพลาดในการเชื่อมต่อกับเซิร์ฟเวอร์ฐานข้อมูลอาหาร');
    }
});

app.get('/add-to-cart/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const response = await fetch(`http://webdev.it.kmitl.ac.th:4000/detail/${id}`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const itemData = await response.json();

        const foodItem = Array.isArray(itemData) ? itemData[0] : itemData;

        if (foodItem) {
            req.session.cart.push(foodItem);
        }

        res.redirect('/menu');
    } catch (error) {
        console.error('Error adding to cart:', error);
        res.status(500).send('เกิดข้อผิดพลาดในการเพิ่มสินค้าลงตะกร้า');
    }
});

app.get('/cart', (req, res) => {
    const cart = req.session.cart;

    const totalPrice = cart.reduce((sum, item) => {
        const price = parseFloat(item.price) || 0;
        return sum + price;
    }, 0);

    res.render('cart', { cart: cart, total: totalPrice });
});

app.get('/checkout', (req, res) => {
    req.session.cart = [];
    res.redirect('/menu');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});