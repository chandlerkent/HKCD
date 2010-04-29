// type/class not found

class A
{
   public static void main( String[] args )
   {
      boolean b = (new B()).start();
   }
}

class B
{
   public boolean start()
   {
      C c = new C();

      return false;
   }
}

