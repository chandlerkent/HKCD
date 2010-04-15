
class Test1 {

	/**
	 * Javadoc comment to be ignored.
	 * 
	 * @param args
	 */
	public static void main(String[] args) {
		// TODO Auto-generated method stub (ignore this comment)
		int i = 7 + 8 * 9;
		if (!true) i = -i; else i = 2*(i); 
		System.out.println(1);
		
		Test1a t = new Test1a();
		int a = t.m1(false);
		System.out.println(a);
	}

}

class Test1a extends Test1 {
	
	int a;
	int b;
	int c;
	
	public int m1(boolean arg1) {
		{ System.out.println(1); }
		if (arg1) System.out.println(b); else System.out.println(c);
		return a;
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
		e = false;
		d = 0;
		while (!e) {
			d = d + 1;
			if (d == 7) e = true; else e = false;
			System.out.println(a);
			System.out.println(b);
		}
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
		return this.m2(0, 1000);
	}
}
