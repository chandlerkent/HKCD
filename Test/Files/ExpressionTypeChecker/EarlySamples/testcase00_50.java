class Test3 {
    public static void main(String[] args) {
        int a = 5;
        
        {
            b = a; // b not in scope
            int b = a + 1;
        }
    }
}
