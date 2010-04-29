class Main {
	public static void main(String[] args) {
		SomeClass a = new SomeClass();
		AnotherClass b = a.method();
	}
}
class AClass {
	public AClass method() {
		return new AClass();
	}
}
class SomeClass extends AClass {
	public AClass method() {
		return this;
	}
}
class AnotherClass {
	// Empty Class
}