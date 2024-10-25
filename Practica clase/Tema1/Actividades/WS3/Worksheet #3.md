These exercises are based on the worksheet #2. You have to ask the user for the data using the prompt function. After that check that you receive a value and in other case show an error message.

### 1. The Fortune Teller

Why pay a fortune teller when you can just program your fortune yourself?

- Write a function named 

  ```
  tellFortune
  ```

   

  that:

  - takes 4 arguments: number of children, partner's name, geographic location, job title.
  - outputs your fortune to the screen like so: "You will be a X in Y, and married to Z with N kids."

- Call that function 3 times with 3 different values for the arguments.

### 2. The Age Calculator

Forgot how old you are? Calculate it!

- Write a function named 

  ```
  calculateAge
  ```

   

  that:

  - takes 2 arguments: birth year, current year.
  - calculates the 2 possible ages based on those years.
  - outputs the result to the screen like so: "You are either NN or NN"

- Call the function three times with different sets of values.

- **Bonus**: Figure out how to get the current year in JavaScript instead of passing it in.

### 3. The Lifetime Supply Calculator

Ever wonder how much a "lifetime supply" of your favorite snack is? Wonder no more!

- Write a function named 

  ```
  calculateSupply
  ```

   

  that:

  - takes 2 arguments: age, amount per day.
  - calculates the amount consumed for rest of the life (based on a constant max age).
  - outputs the result to the screen like so: "You will need NN to last you until the ripe old age of X"

- Call that function three times, passing in different values each time.

- **Bonus**: Accept floating point values for amount per day, and round the result to a round number.

### 4. The Geometrizer

Create 2 functions that calculate properties of a circle.

Create a function called `calcCircumfrence`:

- Pass the radius to the function.
- Calculate the circumference based on the radius, and output "The circumference is NN".

Create a function called `calcArea`:

- Pass the radius to the function.
- Calculate the area based on the radius, and output "The area is NN".

### 5. The Temperature Converter

Create a function called `celsiusToFahrenheit`:

- Store a celsius temperature into a variable.
- Convert it to fahrenheit and output "NN°C is NN°F".

Create a function called `fahrenheitToCelsius`:

- Now store a fahrenheit temperature into a variable.
- Convert it to celsius and output "NN°F is NN°C."