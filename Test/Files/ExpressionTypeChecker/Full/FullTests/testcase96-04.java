class Breakfast {
    public static void main(String[] args){
        Person hungryHungryBob = new Person();
        System.out.println(hungryHungryBob.wakeUp());
        Bacon bacon = new Bacon();
        System.out.println(bacon.unwrap());
        Pan pan = new Pan();
        if (bacon.oink()){
            // This bacon isn't bacon yet!
            System.out.println(-1);
        } else {
            while (bacon.isTasty()){
                System.out.println(hungryHungryBob.fry(bacon, pan));
            }
            System.out.println(hungryHungryBob.eat(bacon));
        }
    }
}

class Bacon {
    int tasty;
    
    public int unwrap(){
        tasty = 0;
        return tasty;
    }
    
    public boolean isTasty(){
        return tasty > 10;
    }

    public int sizzle(){
        tasty = tasty + 1;
        return tasty;
    }
    
    public boolean oink(){
        return tasty < 0;
    }
}

class Pan{
    public int fry(Bacon bacon){
        return bacon.sizzle();
    }
}

class Person{
    int hunger;
    
    public int wakeUp(){
        hunger = 10;
        return hunger;
    }
    
    public int fry(Bacon bacon, Pan pan){
        return pan.fry(bacon);
    }
    
    public int eat(Bacon bacon){
        hunger = hunger - 10;
        return hunger;
    }
    
    public int hungerLevel(){
        return hunger;
    }
}