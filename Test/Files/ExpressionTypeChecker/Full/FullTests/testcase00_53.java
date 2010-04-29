// Invalid assignment of variable x

class Foo 
{ 
	public static void main(String[] args) 
	{ 
	}
}

class Bar 
{ 
	int x;
	
	public Bar self(int a) 
	{ 
		return this; 
	}
}

class Baz extends Bar 
{ 
	public Bar self(int a) 
	{ 
		x = true;
		return this; 
	}
}
