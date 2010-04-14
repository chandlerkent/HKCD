class Foo {
    public static void main (String[] blah) {
        while (true) {
            System.out.println(blah);
        }
        
        Bar bar = new Bar();
        {
            bar = null;
        }
        
        blah = bar;
        bar = this;
        bar = null;
        bar = true;
        bar = false;
        bar = ( false );
        bar = (new Bar()).foo(1, true);
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
        m = z * m;
        return y;
    }
    
    public boolean booleanExpression() {
        y = !y;
        x = -x;
        return y && true;
    } 
}