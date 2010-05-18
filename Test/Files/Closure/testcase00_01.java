class Main {
    public static void main( String[] args ) {
        Function test1 = { | return 12; };
        Function test2 = { | return 42; };
        System.out.println(test1());
        System.out.println(test2());
    }
}
