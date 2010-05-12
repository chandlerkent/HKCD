class Main {

	public static void main(String[] args){
		Adder a = new Adder();
		int b = 0;
		int c = a.addone(a.addone(a.addone(a.addone(a.addone(a.addone(b))))));

		System.out.println(c);
	}
}

class Adder{

	public int addone(int x){
		return x+1;
	}
}
