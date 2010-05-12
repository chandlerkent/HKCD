class Main {
    public static void main(String[] args) {
        System.out.println((new Foo()).foo(5, 7, 2));
        System.out.println((new Bar()).bar());
    }
}

class Foo {
    public int foo(int x, int y, int z) {
        return x * y + z;
    }
}

class Bar extends Foo {
    public int bar() {
        return this.foo(5, 7, 2);
    }
}