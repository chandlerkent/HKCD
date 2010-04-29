/*
 * Testcase designed to test lexical scoping.  This should pass.
 */
class Test1 {
	public static void main(String[] args) {
		int x = 3;
		int y = 10;
		while(x < 10) {
			int z = x * 2;
			y = y + z;
			x = x + 1;
		}

		System.out.println(y);
	}
}

// vim:filetype=java:textwidth=80
