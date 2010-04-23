class Main{
    public static void main(String[] args){
        Unicorn Charlie = new Unicorn();
        int nothing = Charlie.neigh();
    }
}

class Unicorn extends Object{
    public int neigh(){
        return 5;
    }
}

class SuperUnicorn extends Unicorn{}