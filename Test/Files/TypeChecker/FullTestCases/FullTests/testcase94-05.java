//sample class 6
//Example with type errors and correct minijava syntax

class sample6{
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

class stc extends sample6{
	int sms;
	int DSL;
	
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

class mobily extends stc{					
	
	Zain z;					//source of error
	
	public int setsms(boolean x){
		sms = x;
		return 0;
	}
	
	public int setDSL(boolean x){
		DSL = x;
		return 0;
	}
	
}
