//Error case

class bar{

	public static void main(String[] args){
		int a = 4;
	}
}

class otherBar{
	public int bad(){
		return 1;
	}
}

class badBar extends otherBar{
	public bool bad(){
		return false;
	}
}