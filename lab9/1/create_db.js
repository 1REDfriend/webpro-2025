const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('userdata.db');

db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, firstname TEXT, lastname TEXT, position TEXT, email TEXT)");

    const stmt = db.prepare("INSERT INTO users (firstname, lastname, position, email) VALUES (?, ?, ?, ?)");
    stmt.run("สมชาย", "ใจดี", "Web Developer", "somchai@panda.com");
    stmt.run("Alice", "Smith", "Manager", "alice@panda.com");
    stmt.run("John", "Doe", "Designer", "john@panda.com");
    stmt.finalize();

    console.log("Database created with dummy data.");
});

db.close();