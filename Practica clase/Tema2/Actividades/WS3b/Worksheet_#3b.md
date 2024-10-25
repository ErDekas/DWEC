# Homework: Credit Card Validation

You're starting your own credit card business. You need to come up with a new way to validate credit cards with a simple function called `validateCreditCard` that returns `true` or `false`.

Here are the rules for a valid number:

- Number must be 16 digits, all of them must be numbers
- You must have at least two different digits represented (all of the digits cannot be the same)
- The final digit must be even
- The sum of all the digits must be greater than 16



The following credit card numbers are valid:

- `9999777788880000`
- `6666666666661666`

The following credit card numbers are invalid:

- `a92332119c011112` *invalid characters*
- `4444444444444444` *only one type of number*
- `1111111111111110` *sum less than 16*
- `6666666666666661` *odd final number*



In order to run the function, you'll need to know how to [load javascript on an HTML page.](https://www.teaching-materials.org/javascript/exercises/loadjavascripttemplate) From there, you will open your developer console to call the function.

![img](https://www.teaching-materials.org/javascript/images/console.png)


------

**Bonus #1:** A valid credit card number may also contain dashes, to make a card number easier to read. For example, the following credit card numbers are now also valid:

- `9999-7777-8888-0000`
- `6666-6666-6666-1666`

Update your program to allow such numbers. (Hint: Remove the dashes from the input string before checking if the input credit card number is valid.)


------

**Bonus #2:** Return an object indicating whether the credit card is valid, and if not, what the error is
`{ valid: true, number: 'a923-3211-9c01-1112' }`
`{ valid: false, number: 'a923-3211-9c01-1112', error: ‘wrong_length’ }`

------

**Bonus #3:** Make your credit card scheme even more advanced! What are the rules, and what are some numbers that pass or fail? Ideas: check expiration date! Check out the [Luhn Algorithm](https://en.wikipedia.org/wiki/Luhn_algorithm) for inspiration.
