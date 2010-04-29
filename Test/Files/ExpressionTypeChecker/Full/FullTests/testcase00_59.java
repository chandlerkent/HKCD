/*
 * Testcase designed to test inheritance of fields and methods.
 * This should pass.
 */
class Test2 {
	public static void main(String[] args) {
		Test4 t4 = new Test4();
		boolean bogus = t4.setX(10);
		System.out.println(t4.getX());
	}
}

class Test3 {
	int x;

	public boolean setX(int x1) {
		x = x1;
		return true;
	}
}

class Test4 extends Test3 {
	public int getX() {
		return x;
	}
}

// vim:filetype=java:textwidth=80
