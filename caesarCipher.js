// Kryptering
function caesarE(key, cleartext) {
    if (!key || !cleartext) { 
		throw new Error("Key must be a positive integer and cleartext must be a non-empty string."); 
	} 
	if (typeof key !== "number" || key <= 0 || !Number.isInteger(key)) { 
		throw new Error("Key must be a positive integer."); 
    }

    let alphabetLower = "abcdefghijklmnopqrstuvwxyz";
    let alphabetUpper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let result = "";

    for (let char of cleartext) {
        if (alphabetLower.includes(char)) {
            let newIndex = (alphabetLower.indexOf(char) + key) % 26;
            result += alphabetLower[newIndex];
        } else if (alphabetUpper.includes(char)) {
            let newIndex = (alphabetUpper.indexOf(char) + key) % 26;
            result += alphabetUpper[newIndex];
        } else {
            result += char;
        }
    }
    return result;
}
// Dekryptering
function caesarD(key, ciphertext) {
    if (!key || !ciphertext) { 
		throw new Error("Key must be a positive integer and ciphertext must be a non-empty string."); 
	} 
    if (typeof key !== "number" || key <= 0 || !Number.isInteger(key)) { 
		throw new Error("Key must be a positive integer."); 
	}

    let alphabetLower = "abcdefghijklmnopqrstuvwxyz";
    let alphabetUpper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let result = "";

    for (let char of ciphertext) {
        if (alphabetLower.includes(char)) {
            let newIndex = (alphabetLower.indexOf(char) - key + 26) % 26;
            result += alphabetLower[newIndex];
        } else if (alphabetUpper.includes(char)) {
            let newIndex = (alphabetUpper.indexOf(char) - key + 26) % 26;
            result += alphabetUpper[newIndex];
        } else {
            result += char; 
        }
    }
    return result;
}

// Test
try {
    let key = 3;
    let cleartext = "Hello World!";
    let encryptedtext = caesarE(key, cleartext);  
    console.log("Encrypted Text:", encryptedtext);

    let decryptedtext = caesarD(key, encryptedtext);  
    console.log("Decrypted Text:", decryptedtext); 
} catch (error) {
    console.error("Error:", error.message);  
}
/*
Exercise DS.1.0

Create a function caesarE(key, cleartext) that returns a ciphertext of cleartext given the key key. The function must use Caesar’s Cipher. The key must be a positive integer. The cleartext must be a non-empty string.

Create a function caesarD(key, ciphertext) that returns a plaintext of ciphertext given the key key. The function must use Caesar’s Cipher. The key must be a positive integer. The ‘ciphertext’ must be a non-empty string.

Write a program that tests both functions.

You must solve the exercise in either javascript, or python.
*/