const numbers = [3, 5, 7, 2, 8];
const largestNumber = numbers.reduce((max, num) => Math.max(max, num), numbers[0]);
console.log(largestNumber); // 8
const strings = ["apple", "banana", "cherry", "date"];
const longestString = strings.reduce((longest, str) => str.length > longest.length ? str : longest, "");
console.log(longestString); // "banana"
const numbers2 = [1, 2, 3, 4, 5, 6];
const evenNumbers = numbers.filter(num => num % 2 === 0);
console.log(evenNumbers); // [2, 4, 6]
const numbers3 = [1, 2, 3, 4, 5, 6];
const oddNumbers = numbers.filter(num => num % 2 !== 0);
console.log(oddNumbers); // [1, 3, 5]
const words1 = ["this", "is", "a", "test", "example"];
const wordsWithIs = words.filter(word => word.includes('is'));
console.log(wordsWithIs); // ["this", "is"]
const numbers4 = [3, 6, 9, 12];
const allDivisibleByThree = numbers.every(num => num % 3 === 0);
console.log(allDivisibleByThree); // true
const array1 = [1, 2, 3];
const array2 = ['a', 'b', 'c'];
const zipped = array1.map((num, index) => [num, array2[index]]);
console.log(zipped); // [[1, 'a'], [2, 'b'], [3, 'c']]
const array3 = [5, 1, 3];
const array4 = [4, 2, 6];
const sortedJoined = [...array1, ...array2].sort((a, b) => a - b);
console.log(sortedJoined); // [1, 2, 3, 4, 5, 6]
const words2 = ["first", "second", "third"];
const withoutFirstWord = words.slice(1);
console.log(withoutFirstWord); // ["second", "third"]
const words3 = ["second", "third"];
const newWords = ["first", ...words];
console.log(newWords); // ["first", "second", "third"]
const numbers5 = [1, 2, 3, 4, 5];
const replacedNumbers = numbers.map(num => (num % 2 === 0 ? 0 : num));
console.log(replacedNumbers); // [1, 0, 3, 0, 5]
