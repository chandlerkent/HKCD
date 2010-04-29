class Main {
	public static void main(String[] args) {
		SomeClass a = new SomeClass();
		System.out.println(a.checkEq(2,3)); // can only print type int
	}
}
class SomeClass {
	public boolean checkEq(int a, int b) {
		return (a - b == 0) && (b - a == 0);
	}
}
