// un declared method
class Bar {
	public static void main(String[] args) {
		
	}
}

class Foo {
	Bar myBar;
	int myInt;
	boolean myBoolean;
	
	public Bar getBar() { return myBar;}
	public int getMyInt() {return myInt;}
	public boolean getMyBoolean() {return myBoolean;}
}

class Baz {
	public int MyMethod(Foo someFoo) {
		int myInt = someFoo.getMyInt();
		int myBoolean = someFoo.getMyBoolean();
		int nonExisting = someFoo.nonExistingMethod();
		
		return myInt;
	}
}