class Main {
    public static void main(String[] args) {
        
        boolean t = true;
        boolean f = false;
        
        int a = 2;
        int b = 4;
        int c = 8;
        
        if ((t && f) || (f || f) || (t && t)) {
            // This is the correct branch
            boolean cond = t || f;
            if (cond)
                // This is the correct branch
                System.out.println(a + b - c * 10 / 5); // -10
            else
                System.out.println(0);
        } else {
            int d = 5;
            int e = 20;
            
            int r = e * d * d + a + c - -a;
            if (r != 0)
            {
                System.out.println(r);
                if (r < 0)
                    System.out.println(-r);
                else
                    System.out.println(r * 2 / 4);
            }
            else
                System.out.println(1234);
        }
        
        {
            int z = 5;
            int w = 20;
            
            int x = w * z * z + a + c - -a;
            if (x != 0)
            {
                // This is the correct branch
                System.out.println(x);
                if (x < 0)
                    System.out.println(-x); // 512
                else
                    // This is the correct branch
                    System.out.println(x * 2 / 4); // 256
            }
            else
                System.out.println(1234);
        }
        
        int h = 9;
        int i = 10;
        
        if (h < i && t) {
            // This is the correct branch
            System.out.println(i - h); // 1
        } else
            System.out.println(h - i);
        
        a = 0;
        while (a <= 10)
            a = a + 1;
        
        while(a > 0) {
            System.out.println(a); // Prints 11 through 1
            a = a - 1;
        }
        
        boolean tt = t && f || f && f || t == f || f == f;
        if (tt)
            // This is the correct branch
            a = 1;
        else {
            a = 0;
        }
        System.out.println(a); // 1
        
        if (!(!tt)) {
            // This is the correct branch
            System.out.println(100); // 100
        } else {
            System.out.println(999);
        }
    }
}