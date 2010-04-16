class SomeClass {
	public static void main (String[] ID) {
		
	}
}

class SomeOtherClass extends SomeClass{
	int id1;
	boolean id2;
	SomeClass id3;
	
	public int Method1 (int someInt) {
		int result = 10;
		someInt = someInt * result + someInt;
		someInt = someInt + result * someint;
		{someInt = result / someInt;}
		
		if ( 1 + 2 ) 
			System.out.println(new SomeClass());
		else
			while (this)
				result = this;
		
		result = null;
		return result;
	}
	
	public SomeOtherClass ExpressionCheck() {
		SomeClass something = null;
		something = something * something / something;
		something = something | something && something;
		something = something != something;
		something = true;
		something = false;
		something = ((something * something) / something).Method1(10);
		return something;
	}
}