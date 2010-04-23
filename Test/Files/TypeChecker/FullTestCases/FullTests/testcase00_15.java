//Valid case

class myClass{
	public static void main(String[] args){
		int huzzah = 1;
	}
}

class greg{

	int name;

	public int getName(){
		return name;
	}

	public int setName(int x){
		name = x;
		return name;
	}

	public int multName(int x){
		x = name * x;
		return x;
	}
}

class gary{

	int color;

	public boolean isBetter(int y){
		boolean k = color > y;
		return k;
	}

	public int getColor(){
		return color;
	}
}