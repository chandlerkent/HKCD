// 42
// -1
// 0

class Main {
    public static void main(String[] args) {
        int a = 3;
        int b = 2;
        int c = 1;
        
        if (a != c && 1 != 42 && b != 5) {
            System.out.println(42);
        } else {
            System.out.println(-1);
        }
        
        if (a != 3) {
            System.out.println(42);
        } else {
            System.out.println(-1);
        }
        
        System.out.println(0);
    }
}