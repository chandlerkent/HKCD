//Invalid code

class myMainClass{

	public static void main(String[] args){
		int a = 3;
		Foo ell = new Foo();
		a = ell.inc(a);
		a = ell.dec(a);
		a = ell.inc(ell.dec(a));

		boolean truefalse = true;

		truefalse = ell.setValue(truefalse);
	}
}

class Foo{

	int myInt;


	//mismatch return type
	public int inc(int x){
		x = x + 1;
		return true;
	}

	public int dec(int x){
		x = x - false;	//bad Expression matching; implementation dependant
		return x;
	}

	public boolean setValue(boolean tf){
		myInt = tf;		//mismatch assignment of class variable type
		return tf;
	}
}