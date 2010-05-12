class Main {

    public static void main(String[] args) {
		int x = 1;
        if (true) {
            x =  x + 1;
        } else {
            x = x - 1;
        }
		
		/* x should be 2 here */
		System.out.println(x);
		
		int numRuns =  0;
		while (x < 10)
		{
			x = x + 1;
			numRuns = numRuns + 1;
		}		
		
		/* x should now be 10 */
		System.out.println(x);
		System.out.println(numRuns);
    }
}
