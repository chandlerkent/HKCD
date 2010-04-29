class good0 {
	public static void main(String[] args) {
	}
}
class good1 extends good0 {
	public int method1(int a, int b) {
		int a = 3;
		int b = 4;
		return a+b;
	}
}
class good2 extends good1 {
	public int method1(int a, int b) {
		boolean a = true;
		boolean b = false;
		int c = 0;
		if (a && b) {
			c = 3;
		} else {
			c = 4;
		}
		return c;
	}
}
