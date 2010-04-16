
class Test2 {

	public static void main(String[] args) {
		int i = 0;
		while (true && !false) {
			System.out.println(i);
			i = i + 1;
		}
		
		
		
	}

}

class Test2a {
	
	public int bigNestedStatement() {
		{
			{
				{
					{
						{
							{
								{
									{
										{
											{
												{
													{
														System.out.println(0);
													}
												}
											}
										}
									}
									System.out.println(1);
									{
										{
											{
												{
													{
														System.out.println(2);
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
		return 7;
	}
	
	public boolean m3() {
		return this.m3();
	}
	
	
}

class Test2b { /* empty class */ }
class Test2c extends Test2b { /* empty class */ }
class Test2d extends Test2c { /* empty class */ }

class Test2e {
	
	Test2b tb;
	Test2c tc;
	Test2d td;
	
	public Test2b getB() {
		return tb;
	}
	
	public Test2b getC() {
		return tc;
	}
	
	public Test2b getD() {
		return td;
	}
	
	public int gcd(int a, int b) {
		int ret = 0; // was int ret; but that's invalid in MiniJava
		if (a < b) {
			// Swap
			int temp = a;
			a = b;
			b = temp;
		} else
			int unused = 0; // this is valid MiniJava, but not valid Java

		if (b == 0)
			ret = a;
		else
			ret = this.gcd(b, this.mod(a, b)); // didn't have this., which isn't valid
		return ret;
	}
	
	public int mod(int a, int b) {
		int ret = 0; // was int ret; but that's invalid in MiniJava
		if (a > b)
			ret = a;
		else
			ret = this.mod(a, b - a); // didn't have this., which isn't valid
		return ret;
	}
		
}
