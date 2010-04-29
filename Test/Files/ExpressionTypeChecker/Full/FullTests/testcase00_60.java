/*
 * Testcase designed to test lexical scope shadowing.
 * This should not pass, and the compiler should give an error to the effect 
 * of "variable at lexical scope shadowed by new definition".
 */

class Test3 {
	public static void main(String[] args) {
		int x = 3;
		while(x < 10) {
			int x = 5;
			x = x + 1;
		}
	}
}

// vim:filetype=java:textwidth=80
