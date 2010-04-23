class MyClass {
	public static void main(String[] args) {
		System.out.println(1);
	}
}
class SomeClass {
	public int myMethod() {
		return 1;
	}
	public int myMethod(int a) {
		return a;
	}
}
class SomeOtherClass extends SomeClass {
	boolean a;
	public int myMethod() {
		return 1;
	}
	public int myMethod(int a) {
		return a;
	}
	public boolean myMethod(int b) {
		return a;
	}
}
