// Simple Test

class Main {
	
	public static void main(String[] args) {
		int i = 0;
		int k = 2;
		
		while (i < k)
			i = i + 1;
		System.out.println(k);
		System.out.println(i);
		
		boolean b = true;
		boolean c = false;
		c = true && b || !b && b;
		if (c)
			System.out.println(0);
		else
			System.out.println(1);
		
		int j = 0;
		while (j < 10) {
			System.out.println(j);
			System.out.println(j * j);
			j = j + 1;
		}
		{{{{{{{{System.out.println(1 + 2 - 5 * 6 / 3);}}}}}}}}
	}
}
