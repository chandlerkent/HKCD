class Main {
    public static void main(String[] args){
        // The adventures of Froong, the Epic Snail
        Snail Froong = new Snail();
        System.out.println(Froong.embark());
        System.out.println(Froong.scoot());
        System.out.println(Froong.scoot());
        System.out.println(Froong.scoot());
        System.out.println(Froong.scoot());
        System.out.println(Froong.scoot());
        System.out.println(Froong.scurry());
        System.out.println(Froong.scurry());
        System.out.println(Froong.scurry());
    }
}

class Snail {
    int distanceTravelled;
    
    public int embark(){
        distanceTravelled = 0;
        return 0;
    }
    
    public int scoot(){
        return this.move(1);
    }
    
    public int scurry(){
        return this.move(2);
    }
    
    public int move(int distance){
        distanceTravelled = distanceTravelled + distance;
        return distanceTravelled;
    }
}