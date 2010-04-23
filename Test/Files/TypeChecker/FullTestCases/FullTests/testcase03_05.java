class Test5 { public static void main(String[] args) { }}
class Test5a { public int test() { return 0; } }
class Test5b extends Test5c { public boolean test2() { return false; } }
class Test5c { public boolean test2() { return true; } }

/* This program has the following typechecking error(s): 
	class Test5b extends Test5c prior to Test5c's declaration.
*/