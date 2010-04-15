/*
*	PROGRAM: valid1
*	AUTHORS: Norris, C. and Wales, J
*	PURPOSE: Find the GCD of 1071 and 1029, recursively then iteratively
*	USAGE:   java valid1
*/

class valid1
{
	public static void main (String[] args) {
		int a = 1071;
		int b = 1029;

		Euclid gcd = new Euclid();
		gcd.init(a, b);
		
		System.out.println(gcd.gcdRecursive());
		 System.out.println(gcd.gcdIterative());
	}
}

// This is a bad use of OO techniques, but a good test of them
class Euclid{
	int a;
	int b;
	
	public int init(int aa, int bb){
		a = aa;
		b = bb;

		return 0;
	}	

	public int gcdRecursive(){
		int rval = -1;
		if (b == 0) 
			rval = a;
		else{
			int aOld = a;
			int bOld = b;
			b = mod(a, b);
			a = bOld;

			rval = gcdRecursive();

			// to ensure a and b retain their original values
			a = aOld;
			b = bOld;
		}
		
		return rval;
	}

	public int mod(int n, int m){
		//precedence and association :)
		/* also nested {} */
		{{{{{{{{{{{{{{{{{{{{return n - n/m*m;

}}}}}}}}}}}}}}}}}}}}
	}

	public int gcdIterative(){
		while (b != 0) {
			int t = b;
			b = mod(a,b);
			a = -(-t);
		}

		return a;
	}
}