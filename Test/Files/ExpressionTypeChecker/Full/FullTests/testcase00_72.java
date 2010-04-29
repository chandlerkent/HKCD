
class Test {
    public static void main(String[] args) {
	Foo bar = new Foo2().getFoo(); //should pass with flying colors
    }
}

class Foo {
    int avar;
    int anothervar;
}

class Foo2 extends Foo {
    public Foo getFoo() {
	return this;
    }
}
