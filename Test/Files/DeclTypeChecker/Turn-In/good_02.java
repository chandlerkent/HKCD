class Main {
    public static void main(String[] args) {
        // don't really care
    }
}

class Vehicle {
    int wheels;
    int doors;
    int velocity;

    public int wheels() {
        return wheels;
    }
    
    public int setWheels(int newWheels) {
        wheels = newWheels;
        return wheels;
    }
    
    public int doors() {
        return doors;
    }
    
    public int setDoors(int newDoors) {
        doors = newDoors;
        return doors;
    }
    
    public int velocity() {
        return velocity;
    }
    
    public int setVelocity(int velo) {
        velocity = velo;
        return velocity;
    }
}

class Car extends Vehicle {
    
}

class Truck extends Vehicle {
    
}

class Sedan extends Car {
    
}

class Semi extends Truck {
    
}