class Main {
	public static void main(String[] arguments) {
		foo f = new bar();
		System.out.println(f.doSomething(10));
		foo g = new foo();
		System.out.println(g.doSomething(20));
	}
}

class foo {
	int a;
	int b;
	int c;
	int d;
	
	public int doSomething(int e) {
		System.out.println(e);
		a = e;
		b = 3*a;
		c = b + e;
		d = 10*b + c;
		return d;
	}
}

class bar extends foo {
	int alpha;
	int beta;
	int gamma;
	int delta;
	
	public int doSomething(int e) {
		alpha = 10;
		beta = alpha + e;
		gamma = 5*alpha + beta;
		delta = 2*alpha + gamma;
		return alpha;
	}
	
	public int saySomething(int something) {
		System.out.println(something);
		return 0;
	}
}
