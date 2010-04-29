//Invalid code

class myMainClass{

	public static void main(String[] args){
		a = 5;	//undefined variable
		Getter get = new Getter();
		int c = get.set(a);
		int c = get.get();
	}
}

class Getter{

	int field;

	public int set(int x){
		int x = 4;
		field = x + 1;
		return x;
	}

	public int get(){
		return field;
	}
}