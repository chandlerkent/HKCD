//sample class 3
//Example with type errors and correct minijava syntax

class sample3{
	public static void main (String[] args){
	
		int ic = 1;
		int jc = 10;
		int kc = 0;
		int dsl = 0;
		
		kc = (ic + jc)/ic;
		dsl = kc * kc / ic / ic;
		
		System.out.println(kc * ic);
		System.out.println(kc);
		
		stc mystc = null;
		zain myzain = null;
		
		
	}
}

class zain extends mobily{		//source of error
	
	int sms;
	int DSL;
	
	public int setsms(int x){
		sms = x*x;
		return 0;
	}
	
	public int setDSL(int x){
		DSL = x*x*x;
		return 0;
	}
	
}
