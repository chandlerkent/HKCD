class Test4 { public static void main(String[] args) { }}
class Test4a { int x; boolean b; Test4a x; public int getX() { return x; } }

/* This program has the following typechecking error(s): 
	class Test4a redeclares class variable x.
*/