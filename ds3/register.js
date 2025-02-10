'use strict';
const bcrypt = require('bcryptjs');
const sqlite3 = require('better-sqlite3');
const Rockyou = require('./rockyou.js');

const db = new sqlite3('test.db');
const rockyou = new Rockyou();

function register(userid, password) {
    if (!userid || !password) {
        console.log("Error: User ID and password are required.");
        return;
    }

    // Check password security
    if (rockyou.isCompromised(password)) {
        console.log("Error: Password is too weak, choose a stronger one.");
        return;
    }

    // Hash password
    const saltRounds = 12;
    const hashedPassword = bcrypt.hashSync(password, saltRounds);

    // Insert into database
    try {
        const stmt = db.prepare("INSERT INTO user(userid, password) VALUES (?, ?)");
        stmt.run(userid, hashedPassword);
        console.log("User registered successfully!");
    } catch (error) {
        console.error("Error inserting user:", error.message);
    }
}

if (process.argv.length !== 4) {
    console.log("Usage: node register.js <userid> <password>");
} else {
    const userid = process.argv[2];
    const password = process.argv[3];
    register(userid, password);
}

db.close();
