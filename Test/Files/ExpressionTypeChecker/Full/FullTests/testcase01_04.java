class A1 {
    public static void main(String[] a2) {
	System.out.println(1);
    }
}

class double {}

class A3 extends A1 {
    public boolean a6(boolean a7) {
	return !a7;
    }

    public double a4(int a5) {
	return a5*1+5;
    }
}

class A8 extends A3 {
    public boolean a9(boolean a7) {
	return this.a6(a7)+2; //Adding boolean and int -> not cool
    }
}
