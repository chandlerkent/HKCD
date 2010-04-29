class Main {
	public static void main(String[] args) {

	}
}

class Foo {
	int foo;
}

class Bar extends Foo {
	int l1;
	int O0;

	public int baz(boolean abc) {
		int rval = 0;
		if(0){
			rval = l1;
		} else {
			rval = O0;
		}				
		return rval;
	}

}

class Baz extends Bar {

	public int baz(boolean Foo) {
		while(l1){
			l1 = l1 || O0;
		}
		return 0;
	}

}

