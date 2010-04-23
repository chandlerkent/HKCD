class MainClass {
	public static void main (String[] args) {
		int quarters = 4;
		int teams = 2;
		System.out.println(quarters*teams);
	}
}

class BallClass {
	int count;
	boolean isOrange;
	
	public int setCount(int val) {
		count = val;
		return count;
	}
}

class BasketBallClass extends BallClass {
	int isOrange;
	
	public boolean allowsDribble() {
		return true;
	}
}