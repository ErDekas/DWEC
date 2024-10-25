function validateCreditCard(cardNumber) {
    // Remove dashes from the input
    const cleanedNumber = cardNumber.replace(/-/g, '');

    // Validate the length
    if (cleanedNumber.length !== 16) {
        return { valid: false, number: cardNumber, error: 'wrong_length' };
    }

    // Validate if all characters are digits
    if (!/^\d+$/.test(cleanedNumber)) {
        return { valid: false, number: cardNumber, error: 'invalid_characters' };
    }

    // Check for at least two different digits
    const uniqueDigits = new Set(cleanedNumber);
    if (uniqueDigits.size < 2) {
        return { valid: false, number: cardNumber, error: 'only_one_type_of_number' };
    }

    // Check if the last digit is even
    const lastDigit = parseInt(cleanedNumber[cleanedNumber.length - 1]);
    if (lastDigit % 2 !== 0) {
        return { valid: false, number: cardNumber, error: 'odd_final_number' };
    }

    // Calculate the sum of all digits
    const digitSum = [...cleanedNumber].reduce((sum, digit) => sum + parseInt(digit), 0);
    if (digitSum <= 16) {
        return { valid: false, number: cardNumber, error: 'sum_less_than_16' };
    }

    // If all checks are passed
    return { valid: true, number: cardNumber };
}

// Test Cases
console.log(validateCreditCard("9999777788880000")); // { valid: true, number: '9999777788880000' }
console.log(validateCreditCard("6666666666661666")); // { valid: true, number: '6666666666661666' }
console.log(validateCreditCard("a92332119c011112")); // { valid: false, number: 'a92332119c011112', error: 'invalid_characters' }
console.log(validateCreditCard("4444444444444444")); // { valid: false, number: '4444444444444444', error: 'only_one_type_of_number' }
console.log(validateCreditCard("1111111111111110")); // { valid: false, number: '1111111111111110', error: 'sum_less_than_16' }
console.log(validateCreditCard("6666666666666661")); // { valid: false, number: '6666666666666661', error: 'odd_final_number' }
console.log(validateCreditCard("9999-7777-8888-0000")); // { valid: true, number: '9999-7777-8888-0000' }
console.log(validateCreditCard("6666-6666-6666-1666")); // { valid: true, number: '6666-6666-6666-1666' }
