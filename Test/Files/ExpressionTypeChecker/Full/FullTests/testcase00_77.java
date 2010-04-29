class EntryPoint { public static void main(String[] args) {} }

class EntryPoint1 extends EntryPoint {
	int x;
	int x;
	int y;
	
	public boolean x() {return true;}

	public int tryToRedeclare() {
		Point p = new Point();

		int i = 0;
		while (i < 10) {
			int a = i;
			i = i + 1;
		}
		System.out.println(a);
		System.out.println(true);
		System.out.println(i);
		System.out.println(11);
		return 0;
	}
	
	public boolean overrideWithTooFew(int a, boolean b) {return true||true;}

	public boolean overrideWithTooMany() {return true;}
	
	public boolean switchParameterTypes(int a, boolean b) {return b;}
	
	public boolean switchParameterNames(int a, int b) {return true;}
	
	public Point returnTypeDoesNotExist() {return new Point();}
	
	public boolean returnTypeDoesNotMatch1() {return 3;}

	public int returnTypeDoesNotMatch2() {return true;}
}

class EntryPoint2 extends EntryPoint1 {
	int x;
	int y;
	int z;
	
	public int tryToRedeclare() {return 0;}
	
	public int tryToRedeclare() {return 0;}
	
	public boolean overrideWithTooFew(int a) {return true;}

	public boolean overrideWithTooMany(int a) {return true;}

	public boolean switchParameterTypes(boolean a, int b) {return 0 < 1;}
	
	public boolean switchParameterNames(int b, int a) {return 1 > 0;}
	
	public Point returnTypeDoesNotExist() {return new Point();}
}

/*
Sample output:
5:9:   error: redeclaration of class variable 'x'
41:9:  error: redeclaration of class variable from super class 'x'
42:9:  error: redeclaration of class variable from super class 'y'
47:5:  error: redeclaration of method 'tryToRedeclare' in class 'EntryPoint2'
49:5:  error: too few arguments to 'overrideWithTooFew' (got 1, expected 2)
51:5:  error: too many arguments to 'overrideWithTooMany' (got 1, expected 0)
53:5:error: incorrect formals for overriding 'EntryPoint2.switchParameterTypes'
      (expected '['int', 'boolean']' but got '['boolean', 'int']')
11:19: error: instantiating an undefined class 'Point'
18:28: error: undeclared identifier 'a'
19:9:  error: System.out.println only supports integers
33:51: error: instantiating an undefined class 'Point'
33:12: error: unknown return type 'Point'
35:54: error: return type is 'int', expected 'boolean'
37:50: error: return type is 'boolean', expected 'int'
57:51: error: instantiating an undefined class 'Point'
57:12: error: unknown return type 'Point'
*/