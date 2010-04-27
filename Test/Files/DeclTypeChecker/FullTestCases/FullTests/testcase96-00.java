class Blub{
    public static void main(String[] args){}
}

class Ed extends Blub{
    public int estimateNumberOfZombies(int limbs){
	return (limbs/4);
    }
}

class Ned extends Ed{}

class Fred extends Ned{}

class Jed extends Fred{}

class Cred extends Jed{
    public int estimateNumberOfZombies(int limbs, int heads){
	// assumes that zombies must have one head
	int estimate = 0;
	if (heads > (limbs / 4)){
	    estimate = heads;
	} else {
	    estimate = (limbs / 4);
	}
	return estimate;
    }
}
