class Main {
    public static void main(String[] args) {
        Foo foo = new Foo();
        Bar bar = new Bar();
        
        System.out.println(foo.foo(10, 4, 3));
        System.out.println(bar.bar());
        System.out.println(foo.foo(10, 4, 3));
        System.out.println(bar.bar());
    }
}

class Foo {
    boolean returnFourtyTwo;

    public int foo(int x, int y, int z) {
        int result = x * y + z;
        if (returnFourtyTwo) {
            result = 42;
        } else {
            result = result;
        }
        
        returnFourtyTwo = true;

        return result;
    }
}

class Bar extends Foo {
    public int bar() {
        return this.foo(5, 5, 5);
    }
}