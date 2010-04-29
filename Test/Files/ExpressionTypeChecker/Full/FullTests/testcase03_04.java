class Test4 {
	public static void main(String[] args) {
		System.out.println(0);
	}
}

class Test4a {}

class Test4b extends Test4a {}

class Test4c {
	
	Test4b x;
	
	public Test4a getX1() {
		return x; // should be valid, since x is an instance of a subclass of Test4a
	}
	
	public int error() {
		int x = true; // invalid assignment
		return x;
	}
		
}

/* This program contains the following typechecking errors:
	The assignment of x to true in Test4c's error method is invalid.
*/