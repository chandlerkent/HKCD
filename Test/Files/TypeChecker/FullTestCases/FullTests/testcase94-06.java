//sample class 7
//Example with type errors and correct minijava syntax

class sample7{
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

class mobily{
	
	int DSL;
	
	public int getDSL(){
		return DSL;
	}
	
	public int setDSL(int x){
		DSL = x;
		return 0;
	}
}

class stc extends mobily{
	
	int DSL;			//source of error
	int sms;
	
	public int getsms(){		
		return sms;				
	}
	
	public int setsms(int x){	
		sms = x;				
		return 0;
	}
	
	public int getDSL(){
		return DSL;
	}
	
	public int setDSL(int x){
		DSL = x;
		return 0;
	}
}

