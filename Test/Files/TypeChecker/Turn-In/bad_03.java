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
    public int length() {
        return 1;
    }
}

class Baz extends Foo {
    public boolean size() {
        return true;
    }
}