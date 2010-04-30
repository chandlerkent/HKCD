class good0 {
	public static void main(String[] args) {
	    boolean a = true;
	    a = false;
	    a = 4; // bad
	    int b = 4 + 4;
	    int c = 4 * 4 * 4 / 4 + 4;
	    b = 4;
	    boolean d = true;
	    d = 4; // bad
	    int e = 4;
	    e = true; // bad
	}
}

class good1 extends good0 {
	public int method1(int a, int b) {
		return a+b;
	}
}
