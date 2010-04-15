class Test1Remix { // Now with more Syntax Errors!

	/**
	 * Javadoc comment to be ignored.
	 * 
	 * @param args
	 */
	public static void main(String[] args) {
		int i = 7 + 8 * 9;
		if (!true) null else i = 2*(i); // missing semicolon after 'then' statement 
		System.out.println(1);
		
		Test1a t = new Test1a();
		int a = t.m1(false);
		System.out.println(true);
		// System.out.println arg must be an integer, but this is probably 
		// handled by the typechecker later
	// } missing closing bracket now

}

class Test1a extends Test1Remix {
	
	int a;
	public int b; // visibility modifier not allowed in MiniJava
	int c;
	
	public int m1(boolean arg1) {
		{ System.out.println(1); }
		if (arg1) System.out.println(b); else System.out.println(c);
		return this.a; // MiniJava doesn't allow field access using 'this.' 
	}
	
}

/**
 * TODO Put here a description of what this class does.
 * Ignore this Javadoc comment.
 */
class Test1b extends Test1a {
	
	int d;
	boolean e;
	Test1a t;
	
	// Pseudo-constructor for Test1b
	public Test1b init(int d, boolean e) {
		Test1b temp = new Test1b();
		// temp.d = d; // not valid MiniJava
		// temp.e = e; // not valid MiniJava
		int wastedVar = 7 + 8 * 9 / 10;
		boolean wastedVar2 = true || false || true && false && !false == 
										!true && 7 > 8 || 0 != 1000;
		return temp;
	}
	
	public int m1(boolean arg1) { // new m1, overrides Test1a's m1
		e = (((((false)))))); // classic Scheme error, one parenthesis too many
		d = 0;
		while (!!!e) // missing while brackets, still valid though
			d = d + 1;
			if (d == 7) e = true; else e = false;
			System.out.println(a);
			System.out.println(b);

		return d;
	}
	
	public boolean m2(int arg1, int arg2) {
		return arg1 == (arg2 * 2);
	}
	
	public Test1b getSelf() {
		return this;
	}
	
	/*
	 * Method comment to ignore...
	 */
	public boolean m3() {
		return this.m2(0 1000); // missing comma between arguments
	}
}
