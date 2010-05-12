class Main {
	public static void main(String[] args) {
		System.out.println(-5);
		boolean a = true;
		boolean b = false;
		if (a && !(b || a)) {
			System.out.println(1);
		} else {
			System.out.println(21);
		}
	}
}