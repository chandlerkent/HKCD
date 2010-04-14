class Main {
    public static void main (String[] aString) {
        boolean myBool = 4 + true;
        int myInt = 4;
        
        Car ferrari = new Car();
    }
}

class Car {
    int wheels;
    int speed;
    
    public int wheels() {
        return wheels;
    }
    
    public int speed() {
        return speed;
    }
    
    public int setSpeed(int newSpeed,) {
        speed = newSpeed;
        return speed;
    }
    
    public int setWheels(int newWheels) {
        wheels = newWheels;
        return wheels;
    }
}