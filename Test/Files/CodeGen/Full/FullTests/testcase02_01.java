class Main {
	public static void main (String[] args) {
		int x	= 3;
		int y	= 4;
		int z	= x * y;
		Fact fact = new Fact();
		System.out.println(fact.factorial(z));
		System.out.println(fact.factorial2(z));
	}
}

class Fact {
	public int factorial(int i) {
		return this.factorial2(i-1);
	}
	
	public int factorial2(int i) {
		int result	= 1;
		
		while(i > 0)
		{
			result = result * i;
			i = i - 1;
		}
		
		return result;
	}
}