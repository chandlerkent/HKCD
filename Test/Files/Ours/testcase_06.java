class Factorial{
    public static void main(String[] a){
	System.out.println(new Fac().ComputeFac(10));
    }
}

class Fac {

    public int ComputeFac(int num){
	int numaux ;
	if (num < 1)
	    numaux = 1 ;
	else 
	    numaux = num * (this.ComputeFac(num-1)) ;
	return numaux ;
    }

}
