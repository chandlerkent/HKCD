class BadClass {
    public static void main(String[] args) {
        System.out.println();
        
        AnotherBadClass a = new AnotherBadClass(one());
    } 
    
    public int one() {
        return 1;
    }
}

class AnotherBadClass {
    Integer a = new Integer();
    
    public int f(int x, int y) {
        return x + y;
    }
    
    int c;
}