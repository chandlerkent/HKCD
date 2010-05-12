// GCD Implementation

class Main {

	public static void main(String[] args) {
		MyMath mathObj = new MyMath();
		int i = 1;
		while (i <= 10) {
			int k = 1;
			while (k < i) {
				System.out.println(mathObj.gcd(i, k));
				k = k + 1;
			}
			i = i + 1;
		}
	}
}

class MyMath {

	public int gcd(int a, int b) {
		int ret = 0;
		if (a < b)
			ret = this.gcd(b, a);
		else if (b == 0)
			ret = a;
		else
			ret = this.gcd(b, this.mod(a, b));
		return ret;
	}

	public int mod(int a, int b) {
		int ret = 0;
		if (a < b)
			ret = a;
		else
			ret = this.mod(a - b, b);
		return ret;
	}
}