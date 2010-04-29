class A
{
	public static void main(String[] stuff)
	{
		B a = new C();
		int x = 3;
		
		System.out.println (x);
		
		x = a.setJunk(x);
		
		System.out.println (a.getJunk());
		
	}
}

class B 
{
	int junk;
	
	public boolean setJunk(int x)
	{
		junk = x;
		return true;
	}
	public int getJunk()
	{
		return junk;
	}
}

class C extends B
{
	public int getJunk()
	{
		return junk*junk;	
	}
}
