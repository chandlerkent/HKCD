class Main {
    public static void main(String[] args) {
        System.out.println((new Foo()).foo(6));
        // System.out.println((new Bar()).bar());
    }
}

class Foo {
    public int foo(int x) {
        return x * 7;
    }
}

// class Bar extends Foo {
//     public int bar() {
//         return this.foo(6);
//     }
// }