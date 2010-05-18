class Main {
    public static void main( String[] args ) {
        Function test1 = { int a, int b | 
            int x = a * b;
            return x;
        };
        
        Function test2 = { int a | 
            int x = a * a;
            return x;
        };

        System.out.println(test1(6, 7));
        System.out.println(test2(4));
    }
}
