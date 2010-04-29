// invalid shadowing
// checking all of the expressions

class Bar {
	public static void main(String[] args) {
		
	}
}

class Foo {
	Bar myBar;
	int myInt;
	boolean myBoolean;
	
	public Bar shadowCheck(boolean myInt, Foo myBar, int myBoolean) {
		/*myInt = myInt || true;
		myInt = myInt && false;
		myInt = myBoolean >= myBoolean;
		myInt = myBoolean <= myBoolean;
		myInt = myBoolean > myBoolean;
		myInt = myBoolean < myBoolean; */
		
		/*
		if (rhs - 1073741824 >= 0) {
            rhs = rhs - 1073741824;
            rhsOn = true;
        } else
            rhsOn = false;
		*/
			
		
		if (myInt) {
			Bar whatever = myBar.shadowCheck(myInt, myBar, myBoolean);
		} else {
			System.out.println(0);
		}
		
		/*myBoolean = myBoolean + 1;
		myBoolean = myBoolean - 1;
		myBoolean = myBoolean / myBoolean;
		myBoolean = myBoolean * myBoolean;*/
		
		return new Bar();
	}
}

