class Test6 { public static void main(String[] args) { }}
class Test6a { public int test() { return 0; } }
class Test6b extends Test6a { public boolean test2() { return false; } }
class Test6b { public boolean test2() { return true; } }

/* This program has the following typechecking error(s): 
	class Test6b is declared twice in the program.
*/