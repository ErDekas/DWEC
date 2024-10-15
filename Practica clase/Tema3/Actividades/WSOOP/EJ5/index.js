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

class Student extends Lambdasian {
    constructor({ name, age, location, previousBackground, className, favSubjects }) {
        super({ name, age, location }); // Call the parent constructor
        this.previousBackground = previousBackground;
        this.className = className;
        this.favSubjects = favSubjects;
    }

    listSubjects() {
        return `Loving ${this.favSubjects.join(', ')}!`; // Join favSubjects into a string
    }

    PRAssignment(subject) {
        return `${this.name} has submitted a PR for ${subject}`;
    }

    sprintChallenge(subject) {
        return `${this.name} has begun sprint challenge on ${subject}`;
    }
}

// Example usage:
const student = new Student({
    name: "Alice",
    age: 25,
    location: "Wonderland",
    previousBackground: "Graphic Designer",
    className: "CS132",
    favSubjects: ["HTML", "CSS", "JS"]
});

console.log(student.speak()); // "Hello my name is Alice, I am from Wonderland"
console.log(student.listSubjects()); // "Loving HTML, CSS, JS!"
console.log(student.PRAssignment("React")); // "Alice has submitted a PR for React"
console.log(student.sprintChallenge("JavaScript")); // "Alice has begun sprint challenge on JavaScript"
