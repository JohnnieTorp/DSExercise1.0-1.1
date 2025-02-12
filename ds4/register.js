const crypto = require('crypto');
const sqlite3 = require('better-sqlite3');
const Rockyou = require('./Rockyou.js');

const argv = process.argv;
const db = new sqlite3('test.db');

const register = function (user, pwd) {
    let hash = crypto.createHash('sha256').update(pwd).digest('hex');

    try {
        let sql = 'INSERT INTO user256(userid, password, comments) VALUES(?, ?, ?)';
        let stmt = db.prepare(sql);
        stmt.run(user, hash, 'User registered with SHA-256');
        return true;
    } catch (err) {
        console.log(`DB Error: ${err.message}`);
        return false;
    }
};

let enteredUser = argv[2];
let enteredPassword = argv[3];
let rockyou = new Rockyou();

let exists = rockyou.search(enteredPassword);
if (!exists) {
    let res = register(enteredUser, enteredPassword);
    console.log(res ? 'User registered successfully' : 'Registration failed');
} else {
    console.log('Inadequate password');
}

db.close();