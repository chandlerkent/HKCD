// Wrong return type
class A1 {
    public static void main(String[] a2) {
	System.out.println(1);
    }
}

class double {}

class A3 {
    public double a4(int a5) {
	return a5*1;
    }
}

class A6 extends A3 {
    public boolean a7() {
	return this.a5(4)==4;
    }
    
    public double a4(int a5) {
	return this.a7(); //Returning a boolean instead of a double
    }
}
