class Test8 { public static void main(String[] args) { }}
class Test8a { public int test(int a, int b) { return (a + b); } }
class Test8b extends Test8a { public int test(int a, int b, int c) { return (a + b + c); } }
class Test8c extends Test8a { public boolean test(int a, int b) { return false; } }


/* This program has the following typechecking error(s): 
	class Test8b incorrectly overloads Test8a's test method (incorrect number of arguments).
	class Test8c incorrectly overloads Test8a's test method (incorrect return type).
*/