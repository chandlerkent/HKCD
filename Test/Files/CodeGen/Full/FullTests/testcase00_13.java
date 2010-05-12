class Main {

  public static void main(String[] args) {
	B b = new B();
	System.out.println(b.blah(5));
  }
}

class B {
  public int blah(int i) {
  	int result = 0;
	if(i > 1)
		result = i;
	else
		result = this.blah(i) + this.blah(i - 2);
	return result;
  }

}
