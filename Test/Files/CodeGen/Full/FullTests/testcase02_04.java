class Main {
    public static void main(String[] args) {
		Foo myFoo = new Foo();
		Bar myBar = new Bar();
		Foo myFooBar = new Bar();
		
		int x = 10;
		System.out.println(myFoo.doSomething(x));
		System.out.println(myBar.doSomething(x));
		System.out.println(myFooBar.doSomething(x));
    }
}

class Foo {
	public int doSomething(int x) {
		return x + 1;
	}
}

class Bar extends Foo {
	public int doSomething(int x) {
		return x - 1;
	}
}
