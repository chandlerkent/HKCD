/*Test Case 2*/
class a {
	public static void main(String[] args) {
		System.out.println(5);
	}
}

class b {
	public int getNum() {
		return 5;
	}
}

class c extends b {
	public int getNum() {
		return 6;
	}
}

class d extends c {
	public boolean getNum() {
		return 7;
	}
}