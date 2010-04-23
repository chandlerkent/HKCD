// Valid

class Init{

	public static void main(String[] args){
		int a = 4;
		int b = 10;
		int temp = 0;
		System.out.println(a);
		System.out.println(b);
		
		Swapper mySwap = new Swapper();
		temp = mySwap.swap(a,b);
		System.out.println(a);
		System.out.println(b);
	}

}

class Swapper{

	public int swap(int a, int b){
		int temp = a;
		a=b;
		b=temp;
		return temp;
	}

}