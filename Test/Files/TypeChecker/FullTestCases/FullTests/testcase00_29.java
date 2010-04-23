/* Invalid: Subclass declared before superclass */
class Foo 
{ 
	public static void main(String[] args) 
	{
	}
}

class Baz extends Bar
{
}

class Bar
{
}