// This program includes a lot of stuff -- a bunch of precedence testing, a
// useful math library, bitwise operations, and a lot of code!

class BigMain {
	public static void main(String[] ArgumentsToTheProgram) {
	    int a = 4;
	    int b = 8;
	    int c = 16;
	    boolean t =  true;
	    boolean f = false;
	    boolean isTrueFalse  = true  == false;
	    boolean isFalseTrue  = false == true;
	    boolean isTrueTrue   = true  == true;
	    boolean isFalseFalse = false == false;
	    
	    System.out.println(a);
	    System.out.println(a + b);
	    System.out.println(a + b - c);
	    System.out.println(a + b - c * c);
	    System.out.println(a + b - c * c / b);
	    System.out.println(c / a + b / a - b * a - a * a);
	    
	    while (isTrueFalse)
	        t = !true;
	    
	    if (false || !true && true || !true)
	        System.out.println(0); // we failed
	    else
	        System.out.println(1); // we passed
	    
	    int countDown = 10;
	    boolean loopVar = true;
	    while (loopVar) {
	        System.out.println(countDown);
	        countDown = -1 + countDown;
	        loopVar = countDown >= 0;
	    }
	    
	    if (a + b + c == 28){
	        int d = a + b * 10 / 20;
	        System.out.println(d);
	    } else {
	        System.out.println(79);
	        System.out.println(111);
	        System.out.println(112);
	        System.out.println(115);
	        System.out.println(33);
	    }
	}
}

class Math {
    // Not really sure how these get initialized... Are they automatically 0?
    int modCount;
    int expCount;
    int complementCount;
    
    public int mod(int lhs, int rhs) {
        modCount = modCount + 1;
        
        return lhs - lhs / rhs * rhs;
    }
    
    public int exp(int lhs, int rhs) {
        int retval = -1;
        expCount = expCount + 1;
        
        if (rhs < 0)
            retval = -1;
        else {
            int mul = lhs;
            if (rhs == 0)
                retval = 0;
            else
                while (rhs > 0)
                    lhs = lhs * mul;
        }
        
        return retval;
    }
    
    // We're assuming 32-bit signed integers with no errors on an overflow
    public int complement(int val) {
        complementCount = complementCount + 1;
        return 2147483647 - val;
    }
    
    // If MiniJava does not support method overloading, delete the following
    // method
    public boolean complement(boolean val) {
        complementCount = complementCount + 1;
        return !val;
    }
    
    public int displayTotalUsageCount() {
        System.out.println(modCount + expCount + complementCount);
        
        return 0;
    }
}

class BitWise {
    // Assuming 32-bit signed (but positive) integers and we don't and the
    // uppermost bit.
    public int almostAnd(int lhs, int rhs) {
        int retval = 0;
        boolean lhsOn = false;
        boolean rhsOn = false;
        
        /* Bit 30 */
        if (lhs - 1073741824 >= 0) {
            lhs = lhs - 1073741824;
            lhsOn = true;
        } else
            lhsOn = false;
        
        if (rhs - 1073741824 >= 0) {
            rhs = rhs - 1073741824;
            rhsOn = true;
        } else
            rhsOn = false;
        
        if (lhsOn && rhsOn)
            retval = retval + 1073741824;
        else
            retval = retval + 0;
        
        /* Bit 29 */
        if (lhs - 536870912 >= 0) {
            lhs = lhs - 536870912;
            lhsOn = true;
        } else
            lhsOn = false;
        
        if (rhs - 536870912 >= 0) {
            rhs = rhs - 536870912;
            rhsOn = true;
        } else
            rhsOn = false;
        
        if (lhsOn && rhsOn)
            retval = retval + 536870912;
        else
            retval = retval + 0;
        
        /* Bit 28 */
        if (lhs - 268435456 >= 0) {
            lhs = lhs - 268435456;
            lhsOn = true;
        } else
            lhsOn = false;
        
        if (rhs - 268435456 >= 0) {
            rhs = rhs - 268435456;
            rhsOn = true;
        } else
            rhsOn = false;
        
        if (lhsOn && rhsOn)
            retval = retval + 268435456;
        else
            retval = retval + 0;
        
        /* Bit 27 */
        if (lhs - 134217728 >= 0) {
            lhs = lhs - 134217728;
            lhsOn = true;
        } else
            lhsOn = false;
        
        if (rhs - 134217728 >= 0) {
            rhs = rhs - 134217728;
            rhsOn = true;
        } else
            rhsOn = false;
        
        if (lhsOn && rhsOn)
            retval = retval + 134217728;
        else
            retval = retval + 0;
        
        /* Bit 26 */
        if (lhs - 67108864 >= 0) {
            lhs = lhs - 67108864;
            lhsOn = true;
        } else
            lhsOn = false;
        
        if (rhs - 67108864 >= 0) {
            rhs = rhs - 67108864;
            rhsOn = true;
        } else
            rhsOn = false;
        
        if (lhsOn && rhsOn)
            retval = retval + 67108864;
        else
            retval = retval + 0;
        
        /* Bit 25 */
        if (lhs - 33554432 >= 0) {
            lhs = lhs - 33554432;
            lhsOn = true;
        } else
            lhsOn = false;
        
        if (rhs - 33554432 >= 0) {
            rhs = rhs - 33554432;
            rhsOn = true;
        } else
            rhsOn = false;
        
        if (lhsOn && rhsOn)
            retval = retval + 33554432;
        else
            retval = retval + 0;
        /* Well, we ran out of room, but we're pretty sure you get the idea.
         * Just for completeness, here are the remaining decimal values:
         * Bit 24: 16777216
         * Bit 23:  8388608
         * Bit 22:  4194304
         * Bit 21:  2097152
         * Bit 20:  1048576
         * Bit 19:   524288
         * Bit 18:   262144
         * Bit 17:   131072
         * Bit 16:    65536
         * Bit 15:    32768
         * Bit 14:    16384
         * Bit 13:     8192
         * Bit 12:     4096
         * Bit 11:     2048
         * Bit 10:     1024
         * Bit 9:       512
         * Bit 8:       256
         * Bit 7:       128
         * Bit 6:        64
         * Bit 5:        32
         * Bit 4:        16
         * Bit 3:         8
         * Bit 2:         4
         * Bit 1:         2
         * Bit 0:         1
         *
         * Obviously, bitwise or is just a copy and paste of this code with
         * if (lshOn && rhsOn) changed to if (lshOn || rhsOn).
         */
         return retval;
    }
}
