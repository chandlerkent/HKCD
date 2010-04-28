class Foo {
    public static void main(String[] args) {
        
    }
}

class Bar {
    int x;
    boolean y;
    
    public int bar() {
        return x;
    }
    
    public boolean hasBar() {
        return y;
    }
}

class Baz {
    int x;
    boolean y;
    
    public int baz() {
        return x * 7;
    }
    
    public boolean hasBaz() {
        return !y;
    }
}

class Rab extends Bar {
    int z;
    
    public int bar() {
        return z;
    }
}