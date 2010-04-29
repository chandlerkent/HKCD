class Foo {
	public static void main(String[] args) {
		boolean maybe = true;
		while(true || false || maybe) {
			boolean maybe = false;
		}
	}
}