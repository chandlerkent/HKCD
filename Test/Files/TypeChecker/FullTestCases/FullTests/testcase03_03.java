class Test3 { public static void main(String[] args) { }}
class Test3a { int x; int y; int z; }
class Test3b extends Test3a { int a; int b; int c; }
class Test3c extends Test3b { int x; boolean b; }

/* This program has the following typechecking error(s): 
	class Test3c redeclares class variable x, which was previously defined by Test3a.
	class Test3c redeclares class variable b, which was previously defined by Test3b.
*/