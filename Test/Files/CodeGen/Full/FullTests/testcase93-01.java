class Main {
	public static void main(String[] args){
		boolean t = true;
		boolean f = false;
		boolean g = t || f;
		int i = 1;
		int j = 2;
		if(g){
			{
				i = 5;
			}
			System.out.println(i);
		}else{
			System.out.println(j);
		}
	}

}
