/* Invalid: Variable Shadowing */
class Foo 
{ 
	public static void main(String[] args) 
	{ 
	}
}

class Bar
{ 
	int x;
}

class Baz extends Bar
{ 
	boolean x;
}