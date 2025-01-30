// Kryptering med Vigenère Cipher
function vigE(key, cleartext) {
    if (!key || !cleartext) { 
        throw new Error("Key and cleartext must both be non-empty strings."); 
    }
    if (typeof key !== "string" || key.length === 0) { 
        throw new Error("Key must be a non-empty string.");
    }

    let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let result = "";

    key = key.toUpperCase();
    cleartext = cleartext.toUpperCase();

    // Udvid nøgleordet til samme længde som teksten
    let fullKey = "";
    for (let i = 0; i < cleartext.length; i++) {
        fullKey += key[i % key.length]; 
    }

    // Kryptering
    for (let i = 0; i < cleartext.length; i++) {
        let char = cleartext[i];
        if (alphabet.includes(char)) {  
            let shift = alphabet.indexOf(fullKey[i]); 
            let newIndex = (alphabet.indexOf(char) + shift) % 26;
            result += alphabet[newIndex];  
        } else {
            result += char;  
        }
    }
    return result;
}

// Dekryptering 
function vigD(key, ciphertext) {
    if (!key || !ciphertext) { 
        throw new Error("Key and ciphertext must both be non-empty strings."); 
    }
    if (typeof key !== "string" || key.length === 0) { 
        throw new Error("Key must be a non-empty string.");
    }

    let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let result = "";

    key = key.toUpperCase();
    ciphertext = ciphertext.toUpperCase();

    // Udvid nøgleordet til samme længde som teksten
    let fullKey = "";
    for (let i = 0; i < ciphertext.length; i++) {
        fullKey += key[i % key.length]; 
    }

    // Dekryptering
    for (let i = 0; i < ciphertext.length; i++) {
        let char = ciphertext[i];
        if (alphabet.includes(char.toUpperCase())) { 
            let shift = alphabet.indexOf(fullKey[i].toUpperCase()); 
            let newIndex = (alphabet.indexOf(char.toUpperCase()) - shift + 26) % 26;
            result += alphabet[newIndex];  
        } else {
            result += char;  
        }
    }
    return result;
}

// Test
try {
    let key = "KEY";
    let cleartext = "HELLO WORLD!";
    
    // Kryptering
    let encryptedtext = vigE(key, cleartext);
    console.log("Encrypted Text:", encryptedtext);

    // Dekryptering
    let decryptedtext = vigD(key, encryptedtext);
    console.log("Decrypted Text:", decryptedtext);

} catch (error) {
    console.error("Error:", error.message);
}

/*
Exercise DS.1.1

Create a function vigE(key, cleartext) that returns a ciphertext of cleartext given the key key. The function must use the Vigenére Cipher. The key, and the cleartext must both be non-empty strings.

Create a function vigD(key, ciphertext) that returns a plaintext of ciphertext given the key key. The function must use the Vigenére Cipher. The key, and the cleartext must both be non-empty strings.

Write a program that tests both functions.

You must solve the exercise in either javascript, or python.
*/