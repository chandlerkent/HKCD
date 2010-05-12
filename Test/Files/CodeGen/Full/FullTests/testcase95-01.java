class Main {
	public static void main(String[] args) {
		int a = 1;
		int b = 20;
		boolean c = false;
		while (a < b) {
			if (c) {
				a = a + b;
				c = !c;
			} else {
				b = b - a;
				c = !c;
			}
		}
		System.out.println(a);
	}
}