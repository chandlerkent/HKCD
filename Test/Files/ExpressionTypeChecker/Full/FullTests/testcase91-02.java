//invalid return types
class boring
{
   public static void main( String[] args )
   {
      System.out.println(0);
   }
}

class UV {
	int a;
	public int method(int test){
		return true;
	}
}

class shadow extends UV{
	int b;
	public int method(int test){
		return 0;
	}
}