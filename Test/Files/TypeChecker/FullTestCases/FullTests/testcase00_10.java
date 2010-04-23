// Field redeclaration

class class1{
	public static void main(String[] args){
		int a = 1;
		int b = 2;
		System.out.println(a+b);
	}
}

class noPoint{
	int a;
	int b;
	int c;
	int a;
	
	public int sum() {
		return a+b+c;
	}
}
