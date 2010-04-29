// method redeclaration

class A
{
   public static void main( String[] args )
   {
      int b = (new B()).start();
   }
}

class B
{
   public int start()
   {
      return 3;
   }

   public boolean start()
   {
      return false;
   }
}

