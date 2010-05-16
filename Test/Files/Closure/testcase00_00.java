class Main {
    public static void main( String[] args ) {
        int x = 3;
        int y = 4;

        Function test1 = { | return x * y; };
        
        Function test2 = { int y |
            int b = x + y;
            return b;
        };

        int answer1 = test1();
        int answer2 = test2(3);

        System.out.println(answer1); // 12
        System.out.println(answer2); // 6
        System.out.println(test1() + test2(27)); // 42
    }
}
