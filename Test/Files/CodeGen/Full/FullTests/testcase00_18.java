class Main {
    public static void main(String[] args) {

        Blah y = new Blah();

        int count = 12;
        int n = 0;
        while (n <= count) {
            System.out.println(y.fact(n));
            n = n + 1;
        }
    }
}

class Blah {
    public int fact(int x) {
        int ret = 0;
        if (x <= 1) {
            ret = 1;
        } else {
            ret = x * this.fact(x-1);
        }
        return ret;
    }
    
}
