class invalid {
	public static void main(String[] ID){
		//First 7 fibonacci numbers
		int i=0;
		while(i<7){
			System.out.println(fib(i));
			i++;
		}
	
		// main can't return
		return 0;
	}

	// can't have methods in <MainClassDecl>
	public int fib(int n){
		// one-armed if
		if (n == 0) return 1;

		if (n == 1) return 1;
		else{
			return f(n-1) + f(n-2);
		}

		//return statements not as last line of method
	}
}

// class should not have privilege modifier
// class cannot implement interfaces
public class wrong implements IFoo{
	// cannot have assignment 
	int a=0;
	// no private fields
	private int b;
	
	// no private methods, only public
	// "String" should be okay... treated as <ID>
	private int method(String s){
		// valid
		Point p = new Point();
		// invalid -- constructors cannot have params
		Point r2 = new Point(5,7);
	}
}

class Point{
	int l;
	int w;

	// ZOMG constructor WTF
	public Point(int length, int width){
		/* these are wrong -- 
		this.l does not match <<ID = Expr;>> as assignment <Stmt>
		*/
		this.l = length;
		this.w = width
	}
}