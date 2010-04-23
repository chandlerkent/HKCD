class Test7 { public static void main(String[] args) { }}
class Test7a extends MissingClass { public int test() { return 0; } }

/* This program has the following typechecking error(s): 
	class Test7a extends MissingClass, which was not declared.
*/