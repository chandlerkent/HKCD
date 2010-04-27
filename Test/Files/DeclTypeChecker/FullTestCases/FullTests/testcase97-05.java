class Solver {
	public static void main(String [] rc) {
		int i = new StevieWonder().doRubiksCube();
	}
}

class Dude {
	public boolean doRubiksCube() {
		return true;
	}
}

class StevieWonder extends Dude {
	public int doRubiksCube() {
		System.out.println(didIgetIt);
		return 0;
	}
}

