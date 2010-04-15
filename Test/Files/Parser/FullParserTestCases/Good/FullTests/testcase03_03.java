class Test3 {
	public static void main(String[] args) {
		/*These*/ int /*comments*/ i /*should*/ = /*be*/ 0; /*ignored.*/
		int j = 1000;
		Test3a ta = new Test3a();
		if (ta.swap(i, j)) {
			System.out.println(i + j);
			System.out.println(i - j);
		} else {
			System.out.println(i * j);
			// a case of valid MiniJava but invalid Java below
			// Java doesn't support comparisons of ints to null
			// this is probably handled later by the typechecker...
			while (i != null)  
				System.out.println(0);
		}
		
		int k = -1000;
		/* conditional statement was (i < j < k), which seems to be valid MiniJava 
                   but not valid Java; however, the association rules that I used in the 
		   parser generator identify this as invalid, so it was changed */
		if (i < j)
			System.out.println(i + j + k);
		else
			System.out.println(i - j - k);
		
		
		int h = 8;
		int e = 5;
		int l = 12;
		int o = 15;
		int w = 23;
		int r = 18;
		int d = 4;
		System.out.println(h + e + l + l + o + w + o + r + l + d);
	}
}

class Test3a {
	
	// Modeled after an exam question from CSSE 230
	public boolean swap(int a, int b) {
		boolean ret = false; // originally had boolean ret; which is invalid MiniJava
		if (a == b)
			ret = false;
		else {
			int temp = a;
			a = b;
			b = temp;
			ret = true;
		}		
		return ret;
	}

}