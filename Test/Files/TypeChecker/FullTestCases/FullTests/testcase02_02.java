// variable shadowing
class Foo {
	public static void main(String[] args)
	{}
}

class Foo2 {
	int x;
}

class Foo3 extends Foo2
{
	int x;
}