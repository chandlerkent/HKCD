class foo {
	public static void main(String[] args) {
		System.out.println(bar.fib(4));
	}
}

class bar {
	public int fib(int a) {
		int result = 0;
		if (a <= 2) {
			result = 1;
		} else {
			result = bar.fib(a-1) + bar.fib(a-2);
		}
		return result;
	}
}