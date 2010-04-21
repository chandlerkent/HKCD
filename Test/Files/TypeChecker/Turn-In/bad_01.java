class Foo {
    public static void main(String[] args) {
        
    }
}

class Bar {
    public int size() {
        return 0;
    }
}

class Foo extends Bar {
    public Bar createBar() {
        return new Bar();
    }
}