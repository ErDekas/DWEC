class Cat {
    constructor(name) {
        this.name = name;
        this.tiredness = 0;
        this.hunger = 0;
        this.loneliness = 0;
        this.happiness = 10; // Start happy
    }

    feed(amount = 1) {
        this.hunger -= amount;
        this.happiness += amount; // Happy when fed
        this.hunger = Math.max(0, this.hunger); // Can't be less than 0
    }

    sleep(amount = 1) {
        this.tiredness -= amount;
        this.tiredness = Math.max(0, this.tiredness);
        this.happiness += amount; // Happy when well-rested
    }

    pet(amount = 1) {
        if (Math.random() > 0.5) { // Random chance the cat wants to be petted
            this.loneliness -= amount;
            this.happiness += amount; // Happy when petted
            this.loneliness = Math.max(0, this.loneliness);
        } else {
            console.log(`${this.name} doesn't want to be petted right now.`);
        }
    }

    status() {
        console.log(`${this.name} status:`);
        console.log(`Tiredness: ${this.tiredness}`);
        console.log(`Hunger: ${this.hunger}`);
        console.log(`Loneliness: ${this.loneliness}`);
        console.log(`Happiness: ${this.happiness}`);
    }
}

// Example usage
const myCat = new Cat('Whiskers');
myCat.feed(3);
myCat.sleep(2);
myCat.pet(5);
myCat.status();
