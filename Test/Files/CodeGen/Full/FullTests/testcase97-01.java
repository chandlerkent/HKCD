class Main { 
	public static void main (String[ ] ID) { 
		{
			Fib f = new Fib();
			int ignore = f.setup(0,1);
			System.out.println(f.next());
			System.out.println(f.next());
			System.out.println(f.next());
			System.out.println(f.next());
			System.out.println(f.next());
		} 
	}
}

class Fib {
	int x;
	int y;
	public int setup(int a, int b){
		x = a;
		y = b;
		return 0;
	}
	public int next(){
		int temp = x;
		x = temp + y;
		y = temp;
		return x;
	}
}
