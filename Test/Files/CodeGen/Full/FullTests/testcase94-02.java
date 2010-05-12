class Main
{
   public static void main( String[] args )
   {
      int a = 1;
      int b = 20;
      int c = -5;
      int d = -200;
      
      a = b * c - a;
      
      b = a/d;
      
      c = b + a * c;
      
      System.out.println(a);
      
      sub mm = new sub();
      a = mm.start(b,d);
      
      System.out.println(a);
   }
}

class sub
{
	int i;
	int j;
	
	public int start(int a, int b)
	{
	      return a * b - 30;
	}
}
