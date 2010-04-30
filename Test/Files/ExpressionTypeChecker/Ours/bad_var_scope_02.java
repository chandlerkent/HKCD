class good0 {
	public static void main(String[] args) {
	    a = 3; // bad
	}
}
class good1 extends good0 {
	public int method1(int a, int b) {

		c = false; // bad
		return a+b;
	}
}
class good2 extends good1 {
	public int method1(int a, int b) {
		int c = 0;
		if (a && b) { // bad
			c = 3;
			int d = 3;
			d = 6;
		} else {
			c = 4;
			d = true; // bad
		}
		return c;
	}
}
