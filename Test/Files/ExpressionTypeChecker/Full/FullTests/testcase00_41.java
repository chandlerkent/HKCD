//Invalid Code
class myMainClass{

	public static void main(String[] args){
		Bar one = new Bar();
		int alpha = one.retribution();  //bad assignment of primitive
		int beta = one.commit(alpha);   //bad parameter pass
		int gamma = one.half(beta);	  //bad assignment of non primitive
	}
}

class Bar{
	int uno;
	int quatro;

	public boolean retribution(){
		uno = 9;
		quatro = 39;
		return (uno > quatro);
	}

	public int commit(boolean x){
		uno = 1;
		quatro = 4;
		int result = 0;

		if(x > (uno + quatro)){
			result = uno;
		} else {
			result = quatro;
		}
		return result;
	}

	public Bar half(int beta){
		Bar none = new Bar();
		return none;
	}
}