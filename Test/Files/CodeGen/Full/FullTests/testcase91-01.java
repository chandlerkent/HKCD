class Main {
	public static void main(String[] arguments) {
		int a = 5;
		int b = 10;
		if (a > b) {
			System.out.println(0);
		} else {
			System.out.println(1);
		}
		while (a < b) {
			System.out.println(a);
			a = a + 1;
		}
		System.out.println(a);
		System.out.println(b);
	}
}
