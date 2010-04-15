class Factorial {
	public static void main (String[] args) {
		int n = 10;
		int i = 2;
		int accum = 1;
		while (i < n) {
			accum = accum * i;
			i = i + 1;
		}
		System.out.println(accum);
	}
}