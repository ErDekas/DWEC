class Lambdasian {
    constructor({ name, age, location }) {
        this.name = name;
        this.age = age;
        this.location = location;
    }

    speak() {
        return `Hello my name is ${this.name}, I am from ${this.location}`;
    }
}

// Example usage:
const lambdasian = new Lambdasian({ name: "Alice", age: 28, location: "Wonderland" });
console.log(lambdasian.speak()); // "Hello my name is Alice, I am from Wonderland"
