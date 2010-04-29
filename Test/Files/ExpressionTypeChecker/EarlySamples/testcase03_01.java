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
		int a = t.m1();
		System.out.println(a);
	}

}

class Test1a {

	int a;
	boolean t;
	
	public int m1() {
		return a;
	}
}

/* This program has no typechecking errors. */