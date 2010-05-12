//test heavily on ability to add/sub/mult/div etc

class Main {

	public static void main(String[] args){
		int x = 2;
		int y = 5;
		int z = x * y;
		int pi = 3;
		int epsilon = 12;
		
		x = x + y * x;	//x=12
		z = x - y;		//z=-3
		epsilon = pi * x * x;	//epsilon=12
		
		y = x;	//y=12
		z = y - (z - (z - epsilon)); 	//z = 0
		y = x*(z / 3) / (x * 2 / 1) + x + (pi * z);	//y=12
		x = y + z + pi + epsilon;	// x = 27

		//should print 27
		System.out.println(x);
	}
}
