const fs = require('fs');

class Rockyou {
    static #rockyou = new Set();
    static #filename = './rockyou.txt';

    static getRockyou() {
        if (Rockyou.#rockyou.size === 0) {
            const lines = fs.readFileSync(Rockyou.#filename, 'utf8').split('\n');
            Rockyou.#rockyou = new Set(lines);
        }
    }

    search(word) {
        Rockyou.getRockyou();
        return Rockyou.#rockyou.has(word); 
    }
}

module.exports = Rockyou;