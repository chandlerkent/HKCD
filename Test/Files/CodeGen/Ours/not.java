class Main {
    public static void main(String[] args) {
        boolean a = true;
        
        while (a) {
            System.out.println(42);
            a = !a;
        }
        
        System.out.println(0);
    }
}