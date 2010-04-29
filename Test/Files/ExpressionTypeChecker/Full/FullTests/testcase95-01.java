class Main {
	public static void main(String[] args) {
		SomeClass a = new AnotherClass();
		System.out.println(a.getInt());
	}
}
class SomeClass {
	public int getInt() {
		return 41;
	}
}
class AnotherClass extends SomeClass {
	public int getInt() {
		return 42;
	}
}