class Xmas {
	public static void main(String [] uzi) {
		Dude justice = new Santa(); // not an error
		boolean justiceServed = justice.eliminateNaughty(true); // error 1
		int numNaughty = justice.developLists(); // error 3
	}
}

class Dude {
	public boolean eliminateNaughty(int rpgs) {
		System.out.println(5);
		return false;
	}
}

class Santa extends Dude {
	public boolean eliminateNaughty(int rpgs) {
		return 5; // error 2
	}

	public int developLists() {
		Santa roboticSanta = new Xmas(); // error 4
		return roboticSanta; // error 5
	}
}

