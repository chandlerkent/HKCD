// arguments to System.out.println() must be an int
class InvalidTest2 {
	public static void main(String[] args) {
		int x = 0;
		boolean y = true;
		System.out.println(0); 
		System.out.println(x);
		System.out.println(y);
	}
}