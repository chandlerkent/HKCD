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

class itr
{
	public int start(int a, int b)
	{
	      return a * b + 20;
	}
}

class sub
{
	public int start(int a, int b)
	{
	    itr k = new itr();
	    int i = k.start(a,b);
	    int j = i*6;
	    boolean ax = true;
	    boolean bx = false;
	    boolean cx = true;
	    boolean dx = cx;
	    
	    if(ax && dx)
	    {
	    	if(cx || bx)
	    	{
	    		if(bx)
	    		{
	    			j = i + j;
	    		}
	    		else
	    		{
	    			j = i * i - j;
	    		}
	    	}
	    	else
	    	{
	    		j = i + j;
	    	}
	    }
	    else
	    {
	    	j = i + j;
	    }
	    
		return j;
	}
}
