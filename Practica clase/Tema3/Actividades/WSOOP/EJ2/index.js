class Car {
    constructor(model, milesPerGallon) {
        this.model = model;
        this.milesPerGallon = milesPerGallon;
        this.tank = 0; // Initial fuel in tank
        this.odometer = 0; // Initial distance driven
    }

    fill(gallons) {
        this.tank += gallons; // Add gallons to tank
    }

    drive(distance) {
        const fuelNeeded = distance / this.milesPerGallon; // Calculate fuel needed for the distance

        if (fuelNeeded > this.tank) {
            // If not enough fuel, drive as far as possible
            const possibleDistance = this.tank * this.milesPerGallon;
            this.odometer += possibleDistance; // Update odometer
            this.tank = 0; // Tank is empty
            return `I ran out of fuel at ${this.odometer} miles!`;
        }

        // If enough fuel, drive the full distance
        this.odometer += distance; // Update odometer
        this.tank -= fuelNeeded; // Decrease tank based on fuel used
    }
}

// Example usage:
const myCar = new Car("Toyota", 30);
myCar.fill(10); // Fill the tank with 10 gallons
console.log(myCar.drive(200)); // Drives 200 miles
console.log(myCar.odometer); // Should print 200
console.log(myCar.tank); // Should print the remaining fuel
console.log(myCar.drive(1000)); // Attempt to drive 1000 miles
