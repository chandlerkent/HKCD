class Test2 {
	public static void main(String[] args) {
		if((3 + 2 * 7) && true) {
			int x = 5;
		} else {
			System.out.println(true);
		}
	}
}

/* This program contains the following typechecking errors:
	The expression 3 + 2 * 7 doesn't evaluate to a boolean
	The argument to System.out.println must be an integer 
*/