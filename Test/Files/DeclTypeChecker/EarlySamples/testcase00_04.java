// invalid method overriding

class A
{
   public static void main( String[] args )
   {
      System.out.println( 0 );
   }
}

class C
{
   public int start()
   {
      return false;
   }
}

class B extends C
{
   public boolean start()
   {
      return true;
   }
}

