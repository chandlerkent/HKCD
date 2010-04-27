class MyClass {
	public static void main(String[] args) {
		System.out.println(1);
	}
}
class AnotherClass {
	int a;

	public boolean myMethod(boolean a) {
		return !a;
	}
	public int myMethod(boolean c) {
		return a;
	}
}
