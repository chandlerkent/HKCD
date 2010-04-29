/*
 * Testcase designed to test statements.
 * This should not pass, and the compiler should give errors to the effect of
 * "type mismatch" and "undefined variable at lexical scope",
 * and may adjust them for various statement types.
 */

class Test7 {
	public static void main(String[] args) {
		int x = 5;
		while(x < true) {
			x = x + 1;
			y = y + 3;
		}

		{
			x = 5;
			{
				int y = 5;
				y = x;
			}
			x = y;
		}

		if (x < 10) {
			System.out.println(false);
		} else {
		
		}
	}
}

// vim:filetype=java:textwidth=80
