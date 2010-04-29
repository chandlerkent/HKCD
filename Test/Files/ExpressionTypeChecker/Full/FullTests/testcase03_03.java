class Test3 {
	public static void main(String[] args) {
		System.out.println(0);
	}
}

class Test3a {}

class Test3b {
	
	Test3a x;
	
	public Test3a getX1() {
		return null; // this should be valid MiniJava
	}
	
	public Test3a getX2() {
		return x;	// this should be valid MiniJava
	}
	
	public Test3a getX3() {
		return 0;	// this should be invalid MiniJava
	}
	
}

/* This program contains the following typechecking errors:
	Test3b's getX3() method needs to return an object of type Test3a instead of an integer
*/