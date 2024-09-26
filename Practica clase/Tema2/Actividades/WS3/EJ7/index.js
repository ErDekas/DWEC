function palindrome(str) {
    str = str.toLowerCase().replace(/[\W_]/g, ''); // quita espacios y caracteres no alfanuméricos
    var reversed = str.split("").reverse().join("");
    return str === reversed;
}
console.log(palindrome("hola"));
console.log(palindrome("alola"));
