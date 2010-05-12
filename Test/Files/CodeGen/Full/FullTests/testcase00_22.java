class Main {
	public static void main (String[] args) {
		int c=5;
		int value=1;
		while (c>0) {
			int d=c;
			while(d>0) {
				value=value+1;
				d=d-1;
			}
			c=c-1;
		}
		System.out.println(value);
	}
}
