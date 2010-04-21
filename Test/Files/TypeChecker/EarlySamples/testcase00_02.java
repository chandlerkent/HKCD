// class not defined for field

class A
{
   public static void main( String[] args )
   {
      boolean b = (new B()).start();
   }
}

class B
{
   C c;

   public boolean start()
   {
      return false;
   }
}

