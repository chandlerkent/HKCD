/*
 * This is a valid MiniJava program. It prints the factorial of the numbers 1
 * through 5. It also implements modulus for MiniJava, which is good for
 * testing the order of operations.
 */

class Factorial {
	public static void main(String[] args) {
		FacMethod mthd = new FacMethod();
		
		int num = 5;
		while (num > 0)
			System.out.println(mthd.factorial(num));
		
	}
}

class FacMethod {
    int dummy1;
    int dummy2;
    
	public int factorial(int num) {
		int retval = 0;
		
		if (num <= 1)
			retval = num;
		else
			retval = num * this.factorial(num - 1);
		
        Math math = new Math();
		System.out.println(math.mod(retval, num));
		
		return retval;
	}
	
	public boolean isTrueFalse() {
	    return true == false;
	}
}

class Math {
    
    public int mod(int lhs, int rhs) {
        return lhs - lhs / rhs * rhs;
    }
}

class Empty {
    
}

class Nothing extends Empty {
    
}
