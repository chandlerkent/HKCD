class A
{
   public static void main( String[] args )
   {
      System.out.println( (new B()).start() );
   }
}

class C
{
   public int start()
   {
      return 0;
   }
}

class B extends C
{
   public int start()
   {
      return 1;
   }
}

