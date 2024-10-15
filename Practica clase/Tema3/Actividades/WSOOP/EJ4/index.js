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

class Instructor extends Lambdasian {
    constructor({ name, age, location, specialty, favLanguage, catchPhrase }) {
        super({ name, age, location }); // Call the parent constructor
        this.specialty = specialty;
        this.favLanguage = favLanguage;
        this.catchPhrase = catchPhrase;
    }

    demo(subject) {
        return `Today we are learning about ${subject}`;
    }

    grade(student, subject) {
        return `${student.name} receives a perfect score on ${subject}`;
    }
}

// Example usage:
const instructor = new Instructor({
    name: "Bob",
    age: 35,
    location: "New York",
    specialty: "redux",
    favLanguage: "JavaScript",
    catchPhrase: "Don't forget the homies"
});

console.log(instructor.speak()); // "Hello my name is Bob, I am from New York"
console.log(instructor.demo("React")); // "Today we are learning about React"
console.log(instructor.grade({ name: "Alice" }, "JavaScript")); // "Alice receives a perfect score on JavaScript"
