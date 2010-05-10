// prints x! for x = 0 to 10

class Main
{
   public static void main( String[] args )
   {
      compute gen = new compute();
      int i = 0;

      while ( i < 10 )
      {
         System.out.println( gen.exp( i ) );
         i = i + 1;
      }
   }
}

class compute
{
   public int exp( int x )
   {
      int i = x;
      
      while ( i > 0 )
      {
         x = x * i;
         i = i - 1;
      }

      return x;
   }
}

