class Main {
    public static void main( String[] args ) {
        int z = 3;
        
        Function test1 = { int a, int b | 
            int x = a * b * z;
            return x;
        };
        
        boolean bool = test1(4, 3) > 12;
        
        Function test2 = { int a |
            int x = 0;
            if (bool) {
                x = a * a;
            } else {
                x = a;
            }
            
            return x;
        };
        
        System.out.println(test1(6, 7));
        System.out.println(test2(4));
    }
}
