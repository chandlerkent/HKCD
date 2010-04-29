/*
 * Testcase designed to test expression error checking.
 * This should not pass, and the compiler should give errors to the effect of
 * "type mismatch in expression".
 */

class Test6 {
	public static void main(String[] args) {
		{
			// errors here
			int x = 3 + true;
			int y = x + 3 * (4 / false) + x;
			int z = true - (true && 18) || y;
		}
		// x no longer exists here
		int z = x; 
	}
}

// vim:filetype=java:textwidth=80
