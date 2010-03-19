Program      = (Token  Whitespace)*
Token        = ID  Integer  ReservedWord  Operator  Delimiter
ID           = Letter (Letter  Digit)*
Letter       = a ... z  A ... Z
Digit        = 0 ... 9
Integer      = Digit+
ReservedWord = class  public  static  extends  void  int  boolean  if
               else  while  return  null  true  false  this  new
               String  main  System.out.println
Operator     = +  -  *  /  <  <=  >=  >  ==  !=  &&    !
Delimiter    = ;.,=(){}[]
Whitespace   =  space tab newline Comment
