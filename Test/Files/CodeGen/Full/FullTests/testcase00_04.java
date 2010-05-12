// test short-circuiting

class Main
{
   public static void main( String[] args )
   {
      circuitdriver c = new circuitdriver();

      boolean test0 = c.truevalue() || c.falsevalue();
      boolean test1 = c.falsevalue() && c.truevalue();

      if ( test0 && c.truecalledcount() == 1 && ! test1 && c.falsecalledcount() == 1 )
         System.out.println( 1 );
      else
         System.out.println( 0 );
   }
}

class circuitdriver
{
   int truecalled;
   int falsecalled;

   public int truecalledcount()
   {
      return truecalled;
   }

   public int falsecalledcount()
   {
      return falsecalled;
   }

   public boolean truevalue()
   {
      truecalled = truecalled + 1;

      return true;
   }

   public boolean falsevalue()
   {
      falsecalled = falsecalled + 1;

      return false;
   }
}

