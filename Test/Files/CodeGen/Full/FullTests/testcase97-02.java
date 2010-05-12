class Main { 
	// email me if you want the original joke. I'm Sriram
	public static void main (String[ ] ID) { 
		Dude minister = new Minister();
		Dude priest = new Priest();
		Rabbi rabbi = new Rabbi();

		if (minister.walkOnWater(true))
		{
			int i = rabbi.astonish();
		}
		else {}
		if (priest.walkOnWater(true))
		{
			int i = rabbi.astonish();
		}
		else {}
		boolean b = rabbi.walkOnWater(false);
		int i = priest.speculate();
	} 
}

class Dude {
	public boolean walkOnWater(boolean knowsWhereRocksAre) {
		if (!knowsWhereRocksAre) {
			int i = this.flail();
		}
		else {}
		return knowsWhereRocksAre;
	}

	public int flail() {
		System.out.println(13); // the universal number of flailing
		return 0;
	}

	public int speculate() {
		System.out.println(21); // the universal number of speculation
		return 0;
	}
}

class Minister extends Dude {}
class Priest extends Dude {}
class Rabbi extends Dude {
	public int astonish() {
		System.out.println(34); // the universal number of astonishment
		return 0;
	}
}

