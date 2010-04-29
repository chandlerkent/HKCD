// valid minijava

class A
{
   public static void main( String[] args )
   {
      System.out.println( (new B()).start( new C() ) );
   }
}

class B
{
   public int start( C c )
   {
      return c.start();
   }
}

class C
{
   public int start()
   {
      return 3 + 9 / 3;
   }
}

