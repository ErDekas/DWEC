class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
        this.stomach = [];
    }

    eat(food) {
        if (this.stomach.length < 10) {
            this.stomach.push(food);
        }
    }

    poop() {
        this.stomach = [];
    }

    toString() {
        return `${this.name}, ${this.age}`;
    }
}

// Example usage:
const john = new Person("John", 30);
console.log(john.toString()); // "John, 30"
john.eat("apple");
john.eat("banana");
console.log(john.stomach); // ["apple", "banana"]
john.poop();
console.log(john.stomach); // []
