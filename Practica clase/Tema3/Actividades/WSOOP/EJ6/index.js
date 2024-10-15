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
        super({ name, age, location });
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

class ProjectManager extends Instructor {
    constructor({ name, age, location, specialty, favLanguage, catchPhrase, gradClassName, favInstructor }) {
        super({ name, age, location, specialty, favLanguage, catchPhrase });
        this.gradClassName = gradClassName;
        this.favInstructor = favInstructor;
    }

    standUp(channel) {
        return `${this.name} announces to ${channel}, @channel standy times!`;
    }

    debugsCode(student, subject) {
        return `${this.name} debugs ${student.name}'s code on ${subject}`;
    }
}

// Example usage:
const projectManager = new ProjectManager({
    name: "Charlie",
    age: 30,
    location: "Los Angeles",
    specialty: "React",
    favLanguage: "JavaScript",
    catchPhrase: "Let's get it done!",
    gradClassName: "CS1",
    favInstructor: "Sean"
});

console.log(projectManager.speak()); // "Hello my name is Charlie, I am from Los Angeles"
console.log(projectManager.standUp("cs1_channel")); // "Charlie announces to cs1_channel, @channel standy times!"
console.log(projectManager.debugsCode({ name: "Alice" }, "JavaScript")); // "Charlie debugs Alice's code on JavaScript"
