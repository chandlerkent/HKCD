//Valid code

class myMainClass{

	public static void main(String[] args){
		int a = 4;
		int b = 2;
		Math calc = new Math();
		int c = calc.mult(a, b);
		System.out.println(c);
		c = calc.sum(a, b);
		System.out.println(c);
		c = calc.diff(a, b);
		System.out.println(c);
		c = calc.div(a, b);
		System.out.println(c);
	}
}

class Math{

	public int mult(int x, int y){
		int result = x*y;
		return result;
	}

	public int sum(int x, int y){
		int result = x+y;
		return result;
	}

	public int diff(int x, int y){
		int result = x-y;
		return result;
	}

	public int div(int x, int y){
		int result = x/y;
		return result;
	}
}