/* Invalid: Method redeclaration */
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
	
	public Bar self() 
	{ 
		return this; 
	}
}