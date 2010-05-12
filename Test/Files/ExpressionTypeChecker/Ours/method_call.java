class Main {
    public static void main(String[] args){
        Baz baz = new Baz();
    	
    	System.out.println(baz.bar(baz, baz, baz));
    }
}
class Foo {
}

class Bar extends Foo {
}

class Baz extends Bar {
    public int bar(Foo foo, Bar bar, Baz baz) {
        return 0;
    }
}