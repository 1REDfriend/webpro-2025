// setup_quiz_db.js
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('questions.db');

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS questions (
        QID INTEGER PRIMARY KEY AUTOINCREMENT,
        Stem TEXT,
        Alt_A TEXT,
        Alt_B TEXT,
        Alt_C TEXT,
        Alt_D TEXT,
        Correct TEXT
    )`);

    const stmt = db.prepare("INSERT INTO questions (Stem, Alt_A, Alt_B, Alt_C, Alt_D, Correct) VALUES (?, ?, ?, ?, ?, ?)");

    stmt.run("What is the full form of SQL?", "Structured Query List", "Structure Query Language", "Sample Query Language", "None of these", "B");
    stmt.run("Which of the following is not a valid SQL type?", "FLOAT", "NUMERIC", "DECIMAL", "CHARACTER", "D"); // สมมติว่า D ผิด (ในความเป็นจริง CHARACTER มี แต่โจทย์ในรูปข้อ 2 อาจจะหลอก)
    stmt.run("Which of the following is not a DDL command?", "TRUNCATE", "ALTER", "CREATE", "UPDATE", "D");

    stmt.finalize();
    console.log("Created questions.db with dummy data.");
});

db.close();