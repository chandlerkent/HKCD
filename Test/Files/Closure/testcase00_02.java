class Main {
    public static void main( String[] args ) {
        Function test1 = { int a, int b | return a * b; };
        Function test2 = { int a | return a; };
        
        System.out.println(test1(6, 7));
        System.out.println(test2(42));
    }
}
