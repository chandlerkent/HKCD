// Valid
class Test4 {
    public static void main(String[] args) {
        if (true) {
            { int b = 5; }
            { int b = 5; }
        } else {
            int b = 5;
        }
    }
}
