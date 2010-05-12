class Main {
	public static void main(String[] args) {
		Bar b = new Bar();
		System.out.println(b.getValue());
	}
}

class Foo {
	public int heyThere() {
		return 42;
	}
}

class Bar extends Foo {
	public int getValue() {
		return this.heyThere();
	}
}