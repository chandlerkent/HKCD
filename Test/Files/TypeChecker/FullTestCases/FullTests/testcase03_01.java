class Test1 { public static void main(String[] args) { }}
class Test1a { public int test() { return 0; } }
class Test1b extends Test1a { public int test() { return 1; } }

/* This program has no typechecking errors. */