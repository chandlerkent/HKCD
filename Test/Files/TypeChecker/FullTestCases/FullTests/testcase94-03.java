//sample class 4
//Example with type errors and correct minijava syntax

class sample4{
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

class zain extends mobily{		//source of error
	
	public int setsms(int x){
		sms = x*x;
		return 0;
	}
	
	public int setDSL(int x){
		DSL = x*x*x;
		return 0;
	}
	
}

class mobily{
	int sms;
	int DSL;
}

