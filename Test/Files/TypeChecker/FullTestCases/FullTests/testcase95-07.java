class MyClass {
	public static void main(String[] args) {
		System.out.println(1);
	}
}
class SomeClass {
	public int myMethod(int a) {
		return a;
	}
	public boolean myMethod(boolean b) {
		return a;
	}
}
class AClass extends SomeClass {
    public boolean myMethod(int a) {
        return true;
    }
}