class Test {
    public static void main(String[] args) {
	Foo2 bar = new Foo2();
    }
}

class Foo {
    int avar;
    int anothervar;
}

class Foo2 extends Foo {
    public int doit(int x) {
	int avar = 0; //can't re-define a_var from Foo
	return avar;
    }
}
