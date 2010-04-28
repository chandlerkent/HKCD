class Foo {
    public static void main(String[] args) {
        
    }
}

class Bar {
    public int size() {
        return 0;
    }
}

class Rab extends Bar {
    public int length() {
        return 1;
    }
}

class Baz extends Rab {
    public int size() {
        return true;
    }
}