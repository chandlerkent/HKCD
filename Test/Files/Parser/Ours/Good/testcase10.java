class Foo {
    public static void main (String[] blah) {
        while (true) {
            System.out.println(blah);
        }
    }
}

class Bar extends Baz {
    int x;
    boolean y;
    
    public int foo (int yellow, boolean blue) {
        return x;
    }
    
    public boolean bar () {
        int z = 4;
        int m = z;
        if(z > 6) {
            m = 9;
        }
        else {
            m = 4;
        }
        return y;
    }
    
    public boolean booleanExpression() {
        y = !y;
        x = -x;
        return y && true;
    } 
}