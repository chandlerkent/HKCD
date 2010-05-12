class Main { 
	public static void main (String[ ] ID) { 

		Dude santaClaus = new Xterminator();
		System.out.println(santaClaus.slayLiving(100));
	} 
}

class Dude {
	public int slayLiving(int i) {
		return 0;
	}
}

class Xterminator extends Dude {
	public int slayLiving(int i) {
		int j = 0;
		int live = 0;
		while (j <= i) {
			if (this.isLive(i)) {
				live = live + 1;
			}
			else {
				live = live;
			}
			j = j + 1;
		}

		return live;
	}

	public boolean isLive(int i) {
		int j = 0;
		int k = 1;
		int temp = 1;
		while (k < i) {
			temp = j + k;
			j = k;
			k = temp;
		}

		return (i == 0) || (k == i);
	}
}

