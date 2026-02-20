const express = require('express');
const app = express();
const port = 3000;

// กำหนดให้ EJS เป็น Templating Engine
app.set('view engine', 'ejs');

// สร้าง Route สำหรับหน้าแสดงรายการหนังสือ
app.get('/books', async (req, res) => {
    const endpoint = 'http://webdev.it.kmitl.ac.th:4000/books';

    try {
        const response = await fetch(endpoint);

        // ตรวจสอบว่าสถานะการตอบกลับสมบูรณ์หรือไม่
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const booksData = await response.json();

        // ส่งข้อมูลไปยังไฟล์ views/books.ejs
        res.render('books', { data: booksData });

    } catch (error) {
        console.error('Error fetching book data:', error);
        res.status(500).send('ไม่สามารถเชื่อมต่อกับ REST API ได้ในขณะนี้');
    }
});

app.listen(port, () => {
    console.log(`Starting server at http://localhost:${port}/books`);
});