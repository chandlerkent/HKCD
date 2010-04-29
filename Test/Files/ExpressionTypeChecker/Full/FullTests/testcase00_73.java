
class Test {
    public static void main(String[] args) {
	Foo2 bar = new Foo().getFoo(); //should fail spectacularly. A Foo is not a Foo2
    }
}

class Foo {
    int avar;
    int anothervar;

    public Foo getFoo() {
	return this;
    }
}

class Foo2 extends Foo {
    
}
