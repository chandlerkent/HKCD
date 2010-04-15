class Test {
    public static void main(String[] args) {
        boolean a = true;
        boolean b = true;
        if ((!a && b) || (a && !b)) {
            if ( a ) {
                a = !a;
            } else {
                b = !b;
            }
        } else {
            int i = 1321;
        }
    }    
}