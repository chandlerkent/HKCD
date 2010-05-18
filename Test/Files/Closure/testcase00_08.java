class Main {
    public static void main( String[] args ) {
        Function x = { int a | return a + a; };
        Function y = { int a | return a * a; };
        
        Foo foo = new Foo();
        int w = 0;
        
        if(foo.boo({ | return true; })) {
            w = 42;
        } else {
            w = -1;
        }
        
        System.out.println(foo.foo(x));
        System.out.println(foo.foo(y));
        System.out.println(foo.foo({ int g | return g * 2; }));
        System.out.println(w);
    }
}

class Foo {
    public int foo(Function x) {
        return x(7);
    }
    
    public boolean boo(Function y) {
        return y();
    }
}
