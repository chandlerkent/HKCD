/*
checks method overloading 
*/
class Test {
    public static void main(String[] args) {
	int x = 5;
	FooExt fe = new FooExt();
	boolean val = fe.predicate(2, 4);
    }
}


class Foo {
    public boolean predicate(int y) {
	return false;
    }
}

class FooExt extends Foo {
    //ok...
    public boolean predicate(int z) {
	return (z > 0);
    }
    //not ok...
    public boolean predicate(int y, int z) {
	return (y < z);
    }
}
