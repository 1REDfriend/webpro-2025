
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('orders.db');

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS orders (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        product TEXT,
        address TEXT,
        phone TEXT,
        status TEXT DEFAULT 'รอดำเนินการ'
    )`);

    const stmt = db.prepare("INSERT INTO orders (name, product, address, phone, status) VALUES (?, ?, ?, ?, ?)");
    stmt.run("กนกวรรณ", "รองเท้ากีฬา", "123 กทม.", "081-111-1111", "รอดำเนินการ");
    stmt.run("วิภาดา", "กระเป๋าเดินทาง", "456 เชียงใหม่", "089-999-9999", "รอดำเนินการ");
    stmt.finalize();

    console.log("Created orders.db successfully.");
});

db.close();