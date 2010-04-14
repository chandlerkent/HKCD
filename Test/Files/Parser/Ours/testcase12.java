class Foo {
    public static void main (String[] blah) {
        while (true) {
            System.out.println(blah);
        }
        
        Bar bar = new Bar();
        {
            bar = null;
        }
        
        blah = 4 + 4;
        blah = 4 - 4;
        blah = 4 / 4;
        blah = 4 * 4;
        blah = 1 < 2;
        blah = 1 <= 2;
        blah = 1 >= 2;
        blah = 1 > 2;
        blah = 1 == 2;
        blah = 1 != 1;
        blah = true && false;
        blah = false || true;
        blah = -3;
        blah = !true;
        blah = new Bar();
        blah = blah;
        blah = this;
        blah = 3;
        blah = null;
        blah = true;
        blah = false;
        blah = (4 + 4 );
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