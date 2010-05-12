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
      
      if(b>0)
      {
    	  System.out.println(a + b);
      }
      else
      {
    	  System.out.println(c/2);
      }
      
      System.out.println(c);
      
     while(c > 500)
     {
    	 System.out.println(c * 4);
    	 c = c - 1;
     }
      
   }
}
