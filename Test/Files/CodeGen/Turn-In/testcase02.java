class Main {
    public static void main(String[] args) {
        Bar bar = new Bar();
        System.out.println((new Foo()).calculate(true) + -(new Foo()).calculate(false) * bar.calculate(true));
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

class Bar extends Foo {
    public int calculate(boolean isFourTwo) {
        int ret = -9;
        if (!isFourTwo && true) {
            ret = -11;
        } else {
            ret = 42;
        }

        return ret;
    }
}