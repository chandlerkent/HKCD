class Test1 {
	public static void main (String[] args) {
		boolean a = 0 || 1;
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
	ReservedWord, boolean
	ID, a
	Delimiter, =
	Interger, 0
	Operator, ||
	Interger, 1
	Delimiter, ;
	Delimiter, }
	Delimiter, }
*/