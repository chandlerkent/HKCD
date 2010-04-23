class Test2 { public static void main(String[] args) { }}
class Test2a { int x; int y; int z; }
class Test2b extends Test2a { int a; int b; int c; }
class Test2c extends Test2a { int a; int b; int c; }
class Test2d extends Test2b { int e; }

/* This program has no typechecking errors. */