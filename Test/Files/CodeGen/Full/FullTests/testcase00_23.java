// Not an official testcase; causes integer overflow

class Main {
    public static void main(String[] args){
        int a = 2*2*2*2*2*2*2*2*2*2*2*2*2*2*2*2*2*2*2*2*2*2*2*2*2*2*2*2*2*2*2;
	int b = 9*9*9*9*9*9*9*0*9*9*9*9*9*9;
	System.out.println(a);
	System.out.println(b);
	System.out.println(a / 2);
    }
}