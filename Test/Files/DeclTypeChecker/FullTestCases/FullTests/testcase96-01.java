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

class Cred extends Jed{}

class Zed extends Ced{}
