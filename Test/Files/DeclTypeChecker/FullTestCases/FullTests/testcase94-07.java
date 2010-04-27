//sample class 8
//Example with type errors and correct minijava syntax

class sample8{
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

class stc extends sample8{
	int sms;
	int DSL;
	
	public int getsms(){
		return sms;
	}
	
}
class mobily extends stc{
	
	public int getDSL(){
		return DSL;
	}
	public int getDSL(){		//source of error
		return DSL;
	}
}

