class Main {
    public static void main( String[] args ) {
        int z = 3;
        
        Function$1 test1 = new Anon$0(z);
        
        boolean bool = test1.apply(4, 3) > 12;
        
        Function$2 test2 = new Anon$1(z, test1, bool);

        System.out.println(test1.apply(6, 7));
        System.out.println(test2.apply(4));
    }
}

interface Function$1 {
    int apply(int a, int b);
}

class Anon$0 implements Function$1 {
    private int z;
    
    public Anon$0(int z) {
        this.z = z;
    }
    
    public int apply(int a, int b) {
        int x = a * b * z;
        return x;
    }
}

interface Function$2 {
    int apply(int a);
}

class Anon$1 implements Function$2 {
    private int z;
    private boolean bool;
    private Function$1 test1;
    
    public Anon$1(int z, Function$1 test1, boolean bool) {
        this.z = z;
        this.test1 = test1;
        this.bool = bool;
    }
    
    public int apply(int a) {
        int x = 0;
        if (bool) {
            x = a * a;
        } else {
            x = a;
        }
        
        return x;
    }
}
