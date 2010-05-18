class Main {
    public static void main( String[] args ) {
        Function x = { int a | return a + a; };
        Function y = { int a | return a * a; };
        
        Foo foo = new Foo();
        System.out.println(foo.foo(x));
        System.out.println(foo.foo(y));
    }
}

class Foo {
    public int foo(Function x) {
        return x(7);
    }
}
