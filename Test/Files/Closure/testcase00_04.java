class Main {
    public static void main( String[] args ) {
        Function test1 = { int a, int b | return new Foo(); };
        Function test2 = { int a | return 42; };
        
        Foo foo = test1(6, 7);
        System.out.println(foo.fourtyTwo());
        System.out.println(test2(42));
    }
}

class Foo {
    public int fourtyTwo() {
        return 42;
    }
}