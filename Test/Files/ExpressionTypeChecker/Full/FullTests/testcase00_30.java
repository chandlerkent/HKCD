/* Invalid: Method Overloading */
class Foo 
{ 
	public static void main(String[] args) 
	{ 
	}
}

class Bar 
{ 
	public Bar self() 
	{ 
		return this; 
	} 
}

class Baz extends Bar 
{ 
	public Bar self(int a) 
	{ 
		return this; 
	} 
}