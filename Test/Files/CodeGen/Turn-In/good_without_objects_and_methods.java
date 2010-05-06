class Main {
    public static void main(String[] args) {
        int out = 42;

        boolean a = true;
        boolean b = false;
        boolean c = (a && b);
        boolean d = (b || c);
        
        if (c) {
            out = out / 7;
        } else {
            out = out * 6;
        }
        
        int count = 0;
        int stop = 42;
        
        while (count < stop) {
            if (!(d && c)) {
                d = false;
                c = d;
                out = out + 4;
                if (out > 50) {
                    out = 42;
                } else {
                    out = out - 1;
                }
            } else {
                c = true;
                d = c;
                out = out * 3;
            }
            
            count = count + 1;
        }

        System.out.println(out);
    }
}