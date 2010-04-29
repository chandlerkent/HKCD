// INVALID

class A
{
   public static void main( String[] args )
   {
      boolean b = (new B()).start(this);
   }
}

class B
{
   public boolean start(A a)
   {
      return false;
   }
   
   public C stop()
   {
	  return new C();
   }
}