class Patient {
	public static void main(String [] cancer) {
		morePillsPleaseKTHXBAI = new Prescription().refill();
	}
}

class Prescription {
	public int refill() {return true; }
}

class YourPrescription extends Prescription {
	int lethal;
	boolean lethal;

	public int refill() {
		lethal = true;
		return false;
	}
}

