class Main {
	public static void main(String[] args) {
	}
}

class Foo {
	boolean bool;
	public int meth(boolean ignore) {
		return 5;
	}
}

class Bar extends Foo {
	public int meth2(boolean abc) {
		return this.meth(3);
	}

}
