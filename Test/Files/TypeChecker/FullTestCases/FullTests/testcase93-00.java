class MainClass {
	public static void main (String[] args){
		System.out.println(2);
	}
}

class SubClass extends MainClass {
	int number;
	boolean flag;
	
	public boolean returnBool() {
		return (false || true);
	}
	
	public int addOne(int num) {
		return num + 1;
	}
}