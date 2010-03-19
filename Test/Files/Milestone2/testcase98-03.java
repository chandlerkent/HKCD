class Test4 {
	public static void main (String[] args) {
		int x = 9;
		if(x/3 < 4) {
			while(x != 0) {
				System.out.println(x);
				x = x - 1;
			}
		}
		else {
			System.out.println(x);
		}
	}
}

/*  Output - Valid Program
	ReservedWord, class
	ID, Test1
	Delimiter, {
	ReservedWord, public
	ReservedWord, static
	ReservedWord, void
	ReservedWord, main
	Delimiter, (
	ReservedWord, String
	Delimiter, [
	Delimiter, ]
	ID, args
	Delimiter, )
	Delimiter, {
	ReservedWord, int
	ID, x
	Delimiter, =
	Interger, 9
	Delimiter, ;
	ReservedWord, if
	Delimiter, (
	ID, x
	Operator, /
	Interger, 3
	Operator, <
	Interger, 4
	Delimiter, )
	Delimiter, {
	ReservedWord, while
	ReservedWord, (
	ID, x
	Operator, !=
	Interger, 0
	ReservedWord, )
	Delimiter, {
	ReservedWord, System.out.println
	ID, x
	Delimiter, ;
	ID, x
	Operator, =
	ID, x
	Operator, -
	Interger, 1
	Delimiter, ;
	Delimiter, }
	Delimiter, }
	ReservedWord, else
	Delimiter, {
	ReservedWord, System.out.println
	ID, x
	Delimiter, ;
	Delimiter, }
	Delimiter, }
	Delimiter, }
*/