class foo {
	public static void main(String[] args) {
		System.out.println(bar.fib(4));
	}
}

class baz {
	public int fib(int a) {
		return a;
	}
}

class bar extends baz {
	public boolean fib2(int a) {
		return baz.fib(a);
	}
}