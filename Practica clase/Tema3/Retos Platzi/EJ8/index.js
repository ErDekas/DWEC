export function calcSum(numbers) {
    return numbers.reduce((sum, number) => sum + number, 0);
}