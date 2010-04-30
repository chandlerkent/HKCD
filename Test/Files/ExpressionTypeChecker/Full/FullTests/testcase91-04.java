//invalid assignment hidden in a branch
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
		return 0;
	}
}

class shadow extends UV{
	int b;
	public int method(int test){
		int result=0;
		if (3 + 2) {
			boolean b=false;
			result=b;
		} else {
			result=1;
		}
	}
}