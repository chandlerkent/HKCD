class Test2 {
    public static void main(String[] args) {
        if (true) {{
            int b = 5;
            }   b = 5; // out of scope
        } else {
            int b = 5;
        }
    }
}
