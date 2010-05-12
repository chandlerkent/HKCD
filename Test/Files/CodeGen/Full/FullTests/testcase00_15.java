
class Main
{
	public static void main(String[] args)
	{
		B b = new B();
		int x = b.p(0);
		System.out.println(x);
	}
}

class B
{
	public int p(int y)
	{
		y = 1;
		System.out.println(y);
		return y;
	}
}