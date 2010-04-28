class Foo {
    public static void main(String[] args) {
        
    }
}

class Bar {
    public int size() {
        return 0;
    }
}

class Baz extends Bar {
    public Bar createBar() {
        return new Baz();
    }
}