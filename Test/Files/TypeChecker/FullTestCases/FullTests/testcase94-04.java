//sample class 5
//Working Example, correct minijava syntax and no type errors

class sample5{
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

class stc extends sample5{
	int sms;
	int DSL;
	
	public int getsms(){
		return sms;
	}
	
	public int setsms(int x){
		int DSL = 10;
		sms = x * mms;
		return 0;
	}
	
	public int getDSL(){
		return DSL;
	}
	
	public int setDSL(int x){
		int sms = 15;
		DSL = x * sms;
		return 0;
	}
}

class zain extends stc{
	
	public int setsms(boolean x){
		sms = x;
		return 0;
	}
	
	public int setDSL(boolean x){
		DSL = x;
		return 0;
	}
	
}
