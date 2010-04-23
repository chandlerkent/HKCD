class Foo {
	public static void main(String[] args) {}
}

class Foo2
{
	int intValue;
	Foo fooValue;
	boolean boolValue;
	
	public Foo method1() {return this;}
	public int method2() {return 0;}
	public boolean method3() {return false;}
}
class Foo3 extends Foo2 {
	public Foo method1() { return this;}
	public int method2() { return 0;}
	public boolean method3() {return false;}
}


