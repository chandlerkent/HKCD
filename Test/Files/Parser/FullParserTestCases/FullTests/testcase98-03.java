// Test 1
class Test1 {
	public static void main(String [] args) {
		HelperTest test = new HelperTest();

		System.out.println(test.add(1, 2));
	}
}

class HelperTest {
	int num1;
	int num2;

	public int add(int one, int two) {
		num1 = one;	//set num1
		num2 = two;	//set num2
		int added = one + two;	//add together

		return added;
	}
}