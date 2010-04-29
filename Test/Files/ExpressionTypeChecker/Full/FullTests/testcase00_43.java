class foo {
	public static void main(String[] args) {
		System.out.println(bar.add(true, false));
	}
}

class bar {
	int a;
	int b;
	
	public int add(int a, int b) {
		return a+ b;
	}
}