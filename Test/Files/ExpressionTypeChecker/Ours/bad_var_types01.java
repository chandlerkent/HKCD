class good0 {
	public static void main(String[] args) {
	    int a = true; // bad
	    int b = 4 + 4;
	    int c = 4 * 4 * 4 / 4 + 4;
	    boolean d = true;
	    boolean e = 4; // bad
	}
}

class good1 extends good0 {
	public int method1(int a, int b) {
		return a+b;
	}
}
