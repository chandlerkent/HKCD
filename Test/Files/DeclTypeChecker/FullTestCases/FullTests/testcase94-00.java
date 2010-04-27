//sample class 1
//Working Example, correct minijava syntax and no type errors

class sample1{
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

class stc{
	int sms;
	boolean mms;
	boolean jawal;
	int DSL;
	
	public int getsms(){
		return sms;
	}
	
	public int setsms(int x){
		sms = x;
		return 0;
	}
	
	public boolean getmms(){
		return mms;
	}
	
	public int setmms(boolean x){
		mms = x;
		return 0;
	}
	
	public boolean getjawal(){
		return jawal;
	}
	
	public int setjawal(boolean x){
		jawal = x;
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

class zain extends stc{
	
	public int setsms(int x){
		sms = x*x;
		return 0;
	}
	
	public int setDSL(int x){
		DSL = x*x*x;
		return 0;
	}
	
}
