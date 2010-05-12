// Inheritance / Method Overriding Test

class Main {

	public static void main(String[] args) {
			A reallyA = new A();
			A reallyB = new B();
			B reallyC = new C();
			C normalC = new C();
			
			System.out.println(reallyA.test()); // Prints 0
			System.out.println(reallyB.test()); // Prints 1
			System.out.println(reallyC.test()); // Prints 2
			
			System.out.println(reallyC.test2()); // Prints 10
			System.out.println(normalC.test2()); // Prints 10
	
	}

}

class A {
	
	public int test() {
		return 0;
	}
	
}

class B extends A {

	public int test() {
		return 1;
	}
	
	public int test2() {
		return 10;
	}

}

class C extends B {

	public int test() {
		return 2;
	}

}