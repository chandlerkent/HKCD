class Main {
	public static void main(String[] args) {
		int a = 973;
		int b = 593;
		int steps = 0;
		
		if(a > b) {
			int t = a;
			a = b;
			b = t;
		} else {
			int waste = 0;
		}
		while(a > 0) {
			int xq = b / a;
			int xm = xq * a;
			int x = b - xm;
			b = a;
			a = x;
			steps = steps + 1;
		}
		System.out.println(b);
		System.out.println(steps);
	}
}
