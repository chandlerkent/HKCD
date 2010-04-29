//invalid local/class declaration type;
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
		b=false;
		int value=true;
		return value*b;
	}
}