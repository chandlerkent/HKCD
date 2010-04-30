class Foo {
    public static void main(String[] args) {
        
    }
}

class Bar {
    public int size() {
        return size;
    }
}

class Baz {
    int size;
    
    public int size() {
        if(true + 5) { // 2 bad
            size = 6;
        } else {
            size = 2;
        }
        
        return size;
    }
}