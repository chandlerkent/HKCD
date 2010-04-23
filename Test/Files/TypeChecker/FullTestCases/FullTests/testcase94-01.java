//sample class 2
//Example with type errors and correct minijava syntax

class sample2{
	public static void main (String[] args){
	
		int ic = 1;
		int jc = 10;
		int kc = 0;
		int dsl = 0;
		
		kc = (ic + jc)/ic;
		dsl = kc * kc / ic / ic;
		
		System.out.println(kc * ic);
		System.out.println(kc);
				
	}
}

class sample2{			//source of error
	int j;
}