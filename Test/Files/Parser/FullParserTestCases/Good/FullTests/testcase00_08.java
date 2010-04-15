//Invalid Mini-Java code
//Valid Java program

class Swapper{
	
	public int a;
	public int b;

	public static void main(String[] args){
		int a = 3;
		int b = 9;

		Swapper mySwap = new Swapper(a,b);

		System.out.println(mySwap.a);
		System.out.println(mySwap.b);
		
		mySwap.swap();
		
		System.out.println(mySwap.a);
		System.out.println(mySwap.b);
	}

	public Swapper(int a, int b){
		this.a = a;
		this.b = b;
	}

	public void swap(){
		int temp;
		temp = this.a;
		this.a = this.b;
		this.b = temp;
		if(a>b){
			System.out.println(a>b);
		}
	}
}