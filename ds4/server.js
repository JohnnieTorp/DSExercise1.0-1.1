const express = require('express');
const sqlite3 = require('better-sqlite3');
const crypto = require('crypto');
const bodyParser = require('body-parser');

const app = express();
const db = new sqlite3('test.db'); 

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

// Route til login
app.post('/login', (req, res) => {
    console.log('Received request:', req.body); // Log request data

    // Hent brugernavn, password og kommentar fra formularen
    const { userid, password, comment } = req.body;

    // Hash password med sha256
    const hash = crypto.createHash('sha256').update(password).digest('hex');

    // Spørg databasen om brugeren findes med det hashede password
    const sql = 'SELECT id, userid FROM user256 WHERE userid = ? AND password = ?';
    const stmt = db.prepare(sql);
    const user = stmt.get(userid, hash);

    // Hvis brugeren findes, log ind og håndter kommentar
    if (user) {
        console.log(`Login successful! User: ${user.userid}`);  // Print successful login to terminal
        // Hvis der er en kommentar, opdater den i databasen
        if (comment) {
            const updateSql = 'UPDATE user256 SET comments = ? WHERE userid = ?';
            const updateStmt = db.prepare(updateSql);
            updateStmt.run(comment, userid);
        }
        res.send(`Login successful! Welcome, ${user.userid}`);
    } else {
        console.log('Login failed');  // Print failed login to terminal
        res.send('Login failed. Try again.');
    }
});

// Serveren kører på port 3000
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
