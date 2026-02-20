const express = require('express');
const app = express();
const port = 3000;

// กำหนดให้ EJS เป็น Templating Engine
app.set('view engine', 'ejs');

// กำหนดโฟลเดอร์สำหรับไฟล์ Static (ถ้ามี)
app.use(express.static('public'));

// หน้าหลัก: ดึงข้อมูลเมนูอาหารทั้งหมด
app.get('/', async (req, res) => {
    const endpoint = 'http://webdev.it.kmitl.ac.th:4000/restaurant';
    try {
        const response = await fetch(endpoint);
        const wsdata = await response.json();

        // ส่งข้อมูลที่ได้ไปยังไฟล์ views/index.ejs
        res.render('index', { data: wsdata });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('ไม่สามารถดึงข้อมูลจาก API ได้');
    }
});

// หน้ารายละเอียด: ดึงข้อมูลเมนูอาหารเฉพาะ ID
app.get('/detail/:id', async (req, res) => {
    const id = req.params.id;
    const endpoint = `http://webdev.it.kmitl.ac.th:4000/detail/${id}`;

    try {
        const response = await fetch(endpoint);
        const detailData = await response.json();

        // ส่งข้อมูลรายละเอียดไปยังไฟล์ views/detail.ejs
        // (สมมติว่า API คืนค่ากลับมาเป็น Object หรือ Array ช่องที่ 0)
        const product = Array.isArray(detailData) ? detailData[0] : detailData;

        res.render('detail', { item: product });
    } catch (error) {
        console.error('Error fetching details:', error);
        res.status(500).send('ไม่สามารถดึงข้อมูลรายละเอียดได้');
    }
});

app.listen(port, () => {
    console.log(`Starting server at port ${port}`);
}); 