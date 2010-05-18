class Main {
    public static void main( String[] args ) {
        Function test1 = { int a, int b | return false; };
        Function test2 = { int a | return 42; };
        
        int a = 0;
        if (test1(6, 7)) {
            a = 42;
        } else {
            a = 0;
        }
        System.out.println(a);
        System.out.println(test2(42));
    }
}
