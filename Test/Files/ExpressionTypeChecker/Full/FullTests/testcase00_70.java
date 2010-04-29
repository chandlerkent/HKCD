class Test {
    public static void main(String[] args) {
	Foo bar = new Foo();
    }
}

class Foo {
    int avar;
    int anothervar;
}

class Foo2 extends Foo {
    int avar; //should break
}
