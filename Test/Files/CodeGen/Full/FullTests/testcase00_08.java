class Main {

	public static void main(String[] args){
		Foo f = new Foo();
		Bar b = new Bar();

		int a = f.get();
		int b2 = b.get();

		System.out.println(a+b2);	//should print 7
	}
}

class Foo{

	public int get(){
		return 2;
	}
}

class Bar extends Foo{

	public int get(){
		return 5;
	}
}
