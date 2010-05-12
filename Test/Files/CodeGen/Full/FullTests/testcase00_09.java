class Main {

	public static void main(String[] args){
		Foo f = new Foo();
		Bar b = new Bar();

		int a = f.set(3);
		a = f.get();
		int c = b.set(6);
		c = b.get();

		System.out.println(a + c);	//should print 12
	}
}

class Foo{

	int val;

	public int set(int x){
		val = x;
		return val;
	}

	public int get(){
		return val;
	}
}

class Bar extends Foo{

	public int get(){
		return 9;
	}
}
