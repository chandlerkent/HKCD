class main {
	public static void main (String[] args) {
		int x	= 3;
		int y	= 4;
		int z7	= x + y;
		Fact fact = new Fact();
		System.out.println(fact.factorial(z7));
		System.out.println(fact.factorial2(z7));
	}
}

class Fact {
	public Fact() {
		/* nothing goes here */
	}

	public int factorial(int i) {
		if(i < 1)
			return i;
			
		return i *  this.factorial(i-1);
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