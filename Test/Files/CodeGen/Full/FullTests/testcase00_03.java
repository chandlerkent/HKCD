// test class variables

class Main
{
   public static void main( String[] args )
   {
      System.out.println( ((((new numerable()).zero()).next()).next()).getValue() );
   }
}

class numerable
{
   int val;

   public int setValue( int v )
   {
      val = v;

      return v;
   }

   public int getValue()
   {
      return val;
   }

   public numerable zero()
   {
      numerable a = new numerable();

      int temp = a.setValue( 0 );

      return a;
   }

   public numerable next()
   {
      numerable a = new numerable();

      int temp = a.setValue( this.getValue() + 1 );

      return a;
   }
}

