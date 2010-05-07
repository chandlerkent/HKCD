class Main {
    public static void main(String[] args) {
        System.out.println((new Foo()).calculate(true));
    }
}

class Foo {
    public int calculate(boolean isFourTwo) {
        int ret = -9;
        if ((true && false) || !(true || false) && !(1 < -2) || isFourTwo) {
            ret = (3 + 6 * 7 / 6) * 4  + 10 - 8;
        } else {
            ret = -9;
        }
        
        return ret;
    }
}