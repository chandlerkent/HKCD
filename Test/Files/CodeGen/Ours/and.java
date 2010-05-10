class Main {
    public static void main(String[] args) {
        boolean a = true;
        boolean b = false;
        boolean c = a && b;
        
        if (a && !b && !c) {
            System.out.println(42);
        } else {
            System.out.println(-1);
        }
        
        System.out.println(0);
    }
}