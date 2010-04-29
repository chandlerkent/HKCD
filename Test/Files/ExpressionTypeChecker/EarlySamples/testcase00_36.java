// invalid assignment

class A
{
   public static void main( String[] args )
   {
      int b = (new B()).start();
   }
}

class B
{
   public boolean start()
   {
      return true;
   }
}

