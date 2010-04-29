/*
 * Testcase designed to test method invocation and return-type checking.
 * This should not pass, and the compiler should give errors to the effect 
 * of "type mismatch in method invocation" and "type mismatch in 
 * return value expression".  
 */

class Test5 {
	public static void main(String[] args) {
		Test6 t6 = new Test6();
		Test8 t8 = new Test8();
		
		// Valid. (?)
		int a = t6.foo(null);
		boolean b = t6.xyzzy(40);
		Test6 c = t6.grue();
		Test6 d = t6.some();
		Test6 g = t8.PuffTheFractalDragon();	// derived to base is okay

		// Invalid.
		a = t6.foo(this);		// cannot reference this in static context
		b = t6.xyzzy(true + 40);	// expression error
		b = t6.xyzzy(true);			// wrong expression type
		Test7 e = t6.grue();		// e is not a Test6
		Test8 f = t6.some();		// f is not a Test8
		Test9 h = t8.PuffTheFractalDragon();	// cannot cast from base to derived
	}
}

class Test6 {
	public int foo(Test5 ref) { return 0; }
	public boolean xyzzy(int a) { return true; }
	public Test6 grue() {
		return this;
	}
	public Test6 some() {
		// Valid!
		return null;
	}
}

class Test7 extends Test6 { }
class Test8 extends Test7 {
	public Test8 PuffTheFractalDragon() {
		return this;
	}
}

class Test9 extends Test8 { }

// vim:filetype=java:textwidth=80
