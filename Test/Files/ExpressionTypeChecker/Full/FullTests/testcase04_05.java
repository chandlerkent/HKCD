class Main {
	public static void main(String[] args) {
	}
}

class Foo {
	int foo;
}

class Bar extends Foo {
	public int baz(boolean abc) {
		foo = 1;
		return foo;
	}

}
