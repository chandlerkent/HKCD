class TheDog {
	public static void main(String [] location) {
		whereWasTheDog = HangingInTheAir;
		whereWasTheDog = AttachedToTheEars;
	}
}

class WhereWasTheDog {
	public boolean hangingInTheAir() {
		return true;
	}

	public int pickedUpByTheEars() {
		return false;
	}

	public boolean attachedToTheEars() {
		return true;
	}
}

class CourtroomDog extends WhereWasTheDog {
	public int attachedToTheEars() {
		return true;
	}
}

