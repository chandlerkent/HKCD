//Error case

class foo{

	public static void main(String[] args){

		int a = 1;
		int b = 2;
		int c = 3;
	}
}


class otherFoo{

	int otherVar;
	boolean otherBool;

	public boolean equal(int x, int y){
		otherBool = (x==y);
		return otherBool;
	}

	public boolean equal(int x, int y, int z){
		if(x == y){
			if(y == z){
				otherBool = true;
			} else {
				otherBool = false;
			}
		} else {
			otherBool = false;
		}

		return otherBool;
	}

	public boolean lastEqual(){
		return otherBool;
	}

	public int sum(int x, int y){
		otherVar = x + y;
		return otherVar;
	}

	public int diff(int x, int y){
		otherVar = x + y;
		return otherVar;
	}

	public int lastMath(){
		return otherVar;
	}
}

class thisFoo extends otherFoo{

	int thisVar;
	int thisBool;

	public boolean equal(int x){
		//thisBool = (Var == x);
		return true; // thisBool;
	}

	public int sum(int x, int z){
		thisVar = x - z;
		return thisVar;
	}
}
