// Local variables cannot shadow parameters.
class good0 {
	public static void main(String[] args) {
	}
}
class good1 extends good0 {
	public int method1(int a, int b) {
		int a = 3; // bad
		int b = 4; // bad
		return a+b;
	}
}
class good2 extends good1 {
	public int method1(int a, int b) {
		boolean a = true; // bad
		boolean b = false; // bad
		int c = 0;
		if (a && b) {
			c = 3;
			int c = 4; // bad
		} else {
			c = 4;
			int c = 5; // bad
			boolean b = true; // bad
		}
		return c;
	}
}
