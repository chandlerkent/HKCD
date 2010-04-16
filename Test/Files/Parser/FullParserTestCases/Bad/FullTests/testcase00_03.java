/** Generic hello world, with a syntax error */

class mainclass
{
   public static void main( String[] trash )
   {
      int b = 9;

      if ( 3 < 4 )
         b = 4;
         b = 4 + b;
      else
         b = 5;
   }
}

