class Main {
	public static void main(String[] arguments) {
		b object = new b();
		System.out.println(object.getA().doSomething());
	}
}

class a {
	public int doSomething() {
		return 5;
	}
}

class b {
	public a getA() {
		return new a();
	}
}
