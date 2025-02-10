const fs = require('fs');

class Rockyou {
    static #instance;
    static #passwords = new Set();
    static #filename = './rockyou.txt';

    constructor() {
        if (!Rockyou.#instance) {
            console.log("Loading compromised passwords...");
            const data = fs.readFileSync(Rockyou.#filename, 'utf8').split('\n');
            Rockyou.#passwords = new Set(data.map(p => p.trim())); 
            Rockyou.#instance = this;
        }
        return Rockyou.#instance;
    }

    isCompromised(password) {
        return Rockyou.#passwords.has(password);
    }
}

module.exports = Rockyou;
