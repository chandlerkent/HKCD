class valid2
{
	public static void main (String[] args) {
		//Empty main, see {Stmt}  in the public static void main declaration's Syntax
	}
}

//class ID extends ID
class Extender extends Foo {
	//ClassVarDecl
	int i;
	boolean b;
	
	//MethodDecl
	public int method1(int j) {
		//no braces on the then, braces on the else
		if(null <= true)
			System.out.println(-1); //error code for wtf
		else {
		}
		
		//braces on the then, no braces on the else
		if(this && false) {
			System.out.println(-1); //error code for wtf
		} else
			j = 2;
		
		return j;
	}
	
	//no Formals
	public boolean method2() {
		//Empty statement, see Stmt ::= { {Stmt} } production in the Syntax
		{}
	}
}