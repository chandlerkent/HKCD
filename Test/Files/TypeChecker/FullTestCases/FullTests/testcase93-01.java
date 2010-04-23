class mainClass {
	public static void main(String[] args){
		
	}
}

class compiler extends mainClass {
	int Int;
	
	public int toInt(){
		Int = 3;
		return Int;
	}
	
}

class superCompiler extends compiler {
	int Dub;
	
	public int toInt(){
		return 0;		
	}
	
	public int toDub(){
		Dub = 0;
		return Dub + 0;
	}
}

class superDuperCompiler extends superCompiler {
	boolean boo;
	
	public int toInt(){
		return 4;
	}
	
	public int toDub(){
		return 8;
	}
	
	public boolean toBoo(){
		boo = false;
		return boo && (3 > 1);
	}
}
