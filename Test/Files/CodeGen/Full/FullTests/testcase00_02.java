// try inheritance

class Main
{
   public static void main( String[] args )
   {
      System.out.println( (new B()).foo() );
      System.out.println( (new B()).bar() );
   }
}

class A
{
   public int foo()
   {
      return 3 * 2 * 1;
   }
}

class B extends A
{
   public int bar()
   {
      return 4 * this.foo();
   }
}

