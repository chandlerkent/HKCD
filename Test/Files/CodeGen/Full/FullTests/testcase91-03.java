class Main {
	public static void main(String[] arguments) {
		int a = 3;
		int b = 4;
		int c = 5;
		boolean triangle = true;
		if (a*a + b*b == c*c) {
			if (triangle) {
				System.out.println(1);
			} else {
				System.out.println(2);
			}
		} else {
			System.out.println(0);
		}
		System.out.println(a + b * c - 20);
	}
}
