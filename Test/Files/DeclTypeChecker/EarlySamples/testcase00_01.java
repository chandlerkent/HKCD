// class redeclaration

class A
{
   public static void main( String[] args )
   {
      int b = (new A()).start();
   }
}

class A
{
   public int start()
   {
      return 3;
   }
}

