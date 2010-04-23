class myMain
{
	public static void main(String[] args)
	{
	}
}

class Foo {
	int intValue;
	Foo fooValue;
	boolean boolValue;
}

class Foo2 extends Foo {
	
	public Foo method1() { return this;}
	public int method2() { return 0;}
	public boolean method3() {return false;}
}
