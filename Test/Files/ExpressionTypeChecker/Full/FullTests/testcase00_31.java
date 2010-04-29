/* Invalid: Method Overloading */
/* Invalid: Subclass declared before superclass */
/* Invalid: Method redeclaration */
/* Invalid: Undeclared type */
/* Invalid: Variable Shadowing */
class Foo 
{ 
	public static void main(String[] args) 
	{ 
	}
}

class Baz extends Bar 
{ 
	boolean x;
	
	public Bar self(int a) 
	{ 
		return this; 
	} 
	
	public Bar self(int a) 
	{ 
		return this; 
	} 
}

class Bar 
{ 
	int x;
	
	public Bar self() 
	{ 
		return this; 
	} 
	
	public Nonexistant self2() 
	{ 
		return this; 
	} 
}