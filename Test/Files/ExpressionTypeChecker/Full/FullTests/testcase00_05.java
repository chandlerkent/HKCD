class A
{
   public static void main( String[] args )
   {
      System.out.println( (new B()).start() );
   }
}

class B
{
   public int start()
   {
      return 1;
   }
}

