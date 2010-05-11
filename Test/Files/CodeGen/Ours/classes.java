class Main {
    public static void main(String[] args) {
        System.out.println((new Foo()).foo(5, 7, 2));
        // System.out.println((new Bar()).bar());
    }
}

class Foo {
    int z;
    int y;
    public int foo(int x, int y, int z) {
        return x * y + z;
    }
}