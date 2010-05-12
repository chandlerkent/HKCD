class Main {
	public static void main(String[] args) {
		Foo f = new Foo();
		boolean a = f.setInt();
		System.out.println(f.getInt());
	}
}

class Foo {
	int i;
	public boolean setInt() {
		i = 41;
		return true;
	}

	public int getInt() {
		return i;
	}
}
