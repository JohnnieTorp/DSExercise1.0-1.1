const crypto = require('crypto');
const sqlite3 = require('better-sqlite3');

// Hent argumenter fra kommandolinjen
const argv = process.argv;

// Tjek om der er nok argumenter (2 argumenter: brugernavn og password)
if (argv.length < 4) {
    console.log("Usage: node login.js <userid> <password>");
    process.exit(1); // Afslut programmet, hvis der mangler argumenter
}

const db = new sqlite3('test.db');

// Funktion til login
const login = function (user, pwd) {
    if (!user || !pwd) {
        console.log("User or password is missing.");
        return;
    }

    // Hash password med sha256
    const hash = crypto.createHash('sha256').update(pwd).digest('hex');

    // Spørg databasen om brugeren findes med det hashede password
    const sql = 'SELECT id, userid FROM user256 WHERE userid = ? AND password = ?';
    const stmt = db.prepare(sql);
    const row = stmt.get(user, hash);

    if (row) {
        console.log(`Login successful! ID: ${row.id}, User: ${row.userid}`);
    } else {
        console.log('Login failed');
    }
};

// Hent brugernavn og password fra kommandolinjen
let enteredUser = argv[2];
let enteredPassword = argv[3];

// Kald loginfunktionen
login(enteredUser, enteredPassword);
db.close();
