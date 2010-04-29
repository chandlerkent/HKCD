class MainClass {
	public static void main(String[] args){
		
	}
}

class ChainRestaurant {
	boolean isCheap;
	boolean isHealthy;
	boolean hasCartoonishMascot;
	
	int locations;
	
	public int setLocations(int val){
		locations = val;
		return val;
	}
	
}

class TacoBell extends ChainRestaurant {
	public TacoBell setVars() {
		isCheap = true;
		isHealthy = false;
		hasCartoonishMascot = 3;
		
		int d = this.setLocations(5);
		return this;
	}
}