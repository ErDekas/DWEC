export function checkArray(array) {
    if (array.length === 0) return false;
    return array.every(number => number % 2 == 0);
}