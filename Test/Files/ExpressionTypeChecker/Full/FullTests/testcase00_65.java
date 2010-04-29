/*
 * Testcase designed to test unary expressions.
 * This should not pass, and the compiler should give errors to the effect of
 * "type mismatch".
 */

class Test8 {
	public static void main(String[] args) {
		boolean x = !3;
		int y = -false;
		int x = !true;
		boolean y = -50;
	}
}

// vim:filetype=java:textwidth=80
