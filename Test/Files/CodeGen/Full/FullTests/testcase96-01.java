class Main {
    public static void main(String[] args){
        // Prints the Fibonacci numbers from 0 to 89
        int ecks = 0;
        int why = 1;
        while(ecks < 100){
            System.out.println(ecks);
            int temp = ecks;
            ecks = why;
            why = temp + why;
        }
    }
}