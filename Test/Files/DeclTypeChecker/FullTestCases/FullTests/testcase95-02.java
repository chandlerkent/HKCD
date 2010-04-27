class MyClass {
	public static void main(String[] args) {
		System.out.println(1);
	}
}
class AnotherClass {
	public AnotherClass myMethod() {
		return this;
	}
}
class YetAnotherClass extends AnotherClass {
	public AnotherClass myMethod() {
		return this;
	}
}
