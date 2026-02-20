const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// 1. ตั้งค่าและสร้างฐานข้อมูล SQLite
const db = new sqlite3.Database('./todo.db', (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to the SQLite database.');
});

// สร้าง Table หากยังไม่มี
db.run(`CREATE TABLE IF NOT EXISTS todos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    deadline TEXT,
    status INTEGER DEFAULT 0
)`);

// ==========================================
// 2. ส่วนของ REST API
// ==========================================

// API ดึงข้อมูล Todo ทั้งหมด
app.get('/api/todos', (req, res) => {
    db.all('SELECT * FROM todos', [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

// API สร้าง Todo ใหม่
app.post('/api/todos', (req, res) => {
    const { title, description, deadline } = req.body;
    const sql = `INSERT INTO todos (title, description, deadline, status) VALUES (?, ?, ?, 0)`;
    
    db.run(sql, [title, description, deadline], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id: this.lastID, message: "Todo created successfully" });
    });
});

// ==========================================
// 3. ส่วนของ Web Routes (EJS)
// ==========================================

// หน้าแสดงรายการ Todo (เรียกใช้ GET API)
app.get('/', async (req, res) => {
    try {
        const response = await fetch(`http://localhost:${port}/api/todos`);
        const todos = await response.json();
        res.render('index', { todos });
    } catch (err) {
        console.error(err);
        res.status(500).send("ไม่สามารถดึงข้อมูลได้");
    }
});

// หน้าฟอร์มสำหรับเพิ่ม Todo
app.get('/create', (req, res) => {
    res.render('create');
});

// จัดการเมื่อ Submit Form (เรียกใช้ POST API)
app.post('/create', async (req, res) => {
    const { title, description, deadline } = req.body;
    try {
        await fetch(`http://localhost:${port}/api/todos`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, description, deadline })
        });
        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.status(500).send("เกิดข้อผิดพลาดในการบันทึกข้อมูล");
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});