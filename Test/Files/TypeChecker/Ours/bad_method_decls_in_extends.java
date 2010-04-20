class Foo {
    public static void main(String[] args) {
        
    }
}

class Bar {
    public int bar() {
        return 3;
    }
    
    public boolean hasBar() {
        return false;
    }
}

class Baz extends Bar {
    public int baz() {
        return 42;
    }
    
    public boolean hasBaz() {
        return true;
    }
    
    public boolean bar() {
        return false;
    }
}