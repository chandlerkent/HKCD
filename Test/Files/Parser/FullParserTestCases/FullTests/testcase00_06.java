/* Jeff's test case/// #1*/

class Fib {
	public static void main (String[] args) {
		int n = 10;
		int last = 1;
		int i = 2;
		int accum = 1;
		int temp;
		while (i < n) {
			temp = accum;
			accum = last + accum;
			last = temp;
			i = i + 1;   //this probably isn't even the right algorithm... but I'm too lazy to check.
		}
		System.out.println(accum);
	}
}