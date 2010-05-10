// 42
// -1
// 0

class Main {
    public static void main(String[] args) {
        int a = 1;
        int b = 2;
        int c = 1;
        
        if (a == c && 1 == 1 && b == 2) {
            System.out.println(42);
        } else {
            System.out.println(-1);
        }
        
        if (a == b) {
            System.out.println(42);
        } else {
            System.out.println(-1);
        }
        
        System.out.println(0);
    }
}