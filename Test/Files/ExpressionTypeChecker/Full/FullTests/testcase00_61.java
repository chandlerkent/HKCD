/*
 * Testcase designed to test method overloading.
 * This should not pass, and the compiler should give an error to the effect 
 * of "illegal method overloading attempted" -- but only in one instance,
 * as described below.
 */

class Test4 {
	public static void main(String[] args) { }
}

class Test5A {
	public int squeamish(int x) {
		System.out.println(x);
		return 100;
	}

	public int ossifrage(int x) {
		System.out.println(x - this.squeamish(x));
		return 150;
	}
}

class Test5 extends Test5A {

}

class Test6 extends Test5 {
	// this IS okay (I think) - see MiniJava typechecking rules, bullet point
	// 6, and Curt's testcase #12.  The type-checker MUST NOT complain
	// about this, if I'm right.
	public int squeamish(int x) {
		return 200;
	}

	// this is NOT okay; the compiler MUST complain about this
	public int ossifrage(boolean x) {
		return 150;
	}
}

// vim:filetype=java:textwidth=80
