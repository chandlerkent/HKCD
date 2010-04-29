//directly overriding methods should work
class Test {
    public static void main(String[] args) {
	Foo bar = new Foo();
	int x = bar.retfour();
    }
}

class Blah {
    public int retfour() {
	return 4;
    }
}

class Foo extends Blah {
    public int retfour() {
	return 5;
    }
}
