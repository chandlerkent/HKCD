class Main {
    public static void main(String[] args) {
        Animal animal = new Animal();
        System.out.println(animal.legs());
        
        Dog dog = new Dog();
        System.out.println(dog.legs());
        
        Cat cat = new Cat();
        System.out.println(cat.legs());
        
        Human human = new Human();
        System.out.println(human.legs());
        
        Spider spider = new Spider();
        System.out.println(spider.legs());
    }
}

class Animal {
    public int legs() {
        return 0;
    }
    
    public boolean hasFur() {
        return false;
    }
}

class Dog extends Animal {
    public int legs() {
        return 4;
    }
    
    public boolean hasFur() {
        return true;
    }
}

class Cat extends Animal {
    public int legs() {
        return 4;
    }
    
    public boolean hasFur() {
        return true;
    }
}

class Human extends Animal {
    public int legs() {
        return 2;
    }
    
    public boolean hasFur() {
        return false;
    }
}

class Spider extends Animal {
    public int legs() {
        return 8;
    }
    
    public boolean hasFur() {
        return true;
    }
}