// bad superclass order

class Main {
    public static void main(String[] args) {
        
    }
}

class Baz extends Foo {
    
    public int baz(boolean abc) {
        return 1;
    }
    
}

class Bar extends Foo {
    int l1;
    int O0;
    
    public int baz(boolean abc) {
        return 0;
    }
    
}

class Foo {
    int foo;
}
