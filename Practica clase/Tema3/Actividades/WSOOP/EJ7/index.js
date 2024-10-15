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

    grade(student) {
        // Randomly add or subtract points between -10 and 10
        const adjustment = Math.floor(Math.random() * 21) - 10;
        student.grade = Math.max(0, Math.min(100, student.grade + adjustment)); // Ensure grade stays between 0 and 100
        return `${this.name} adjusted ${student.name}'s grade to ${student.grade}`;
    }
}

class Student extends Lambdasian {
    constructor({ name, age, location, previousBackground, className, favSubjects }) {
        super({ name, age, location });
        this.previousBackground = previousBackground;
        this.className = className;
        this.favSubjects = favSubjects;
        this.grade = Math.floor(Math.random() * 101); // Initialize grade randomly between 0 and 100
    }

    listSubjects() {
        return `Loving ${this.favSubjects.join(', ')}!`;
    }

    PRAssignment(subject) {
        return `${this.name} has submitted a PR for ${subject}`;
    }

    sprintChallenge(subject) {
        return `${this.name} has begun sprint challenge on ${subject}`;
    }

    graduate() {
        if (this.grade >= 70) {
            return `${this.name} is ready to graduate from Lambda School!`;
        } else {
            return `${this.name} needs to work harder to increase their score.`;
        }
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
const student = new Student({
    name: "Alice",
    age: 25,
    location: "Wonderland",
    previousBackground: "Graphic Designer",
    className: "CS132",
    favSubjects: ["HTML", "CSS", "JS"]
});

const instructor = new Instructor({
    name: "Bob",
    age: 35,
    location: "New York",
    specialty: "React",
    favLanguage: "JavaScript",
    catchPhrase: "Let's get it done!"
});

console.log(student.speak()); // "Hello my name is Alice, I am from Wonderland"
console.log(student.grade); // Random grade between 0-100
console.log(instructor.grade(student)); // Adjusts the student's grade
console.log(student.graduate()); // Checks if Alice is ready to graduate
