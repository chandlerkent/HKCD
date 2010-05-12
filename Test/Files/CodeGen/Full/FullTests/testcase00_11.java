class Main {
    public static void main(String[] args) {
        boolean b = (new A()).setCount(new Count()).fun();
    }
}

class Count {
    
    int count;
    
    public int getCount() {
        return count;
    }
    
    public int increment() {
        count = count + 1;
        return count;
    }
    
    public boolean shouldContinue() {
        return count <= 10;
    }
    
}

class A {
    
    Count c;
    
    public A setCount(Count count) {
        c = count;
        return this;
    }
    
    public int printNum() {
        int a = c.getCount();
        System.out.println(a);
        return a;
    }
    
    public boolean fun() {
        int toss1 = this.printNum();
        toss1 = c.increment();
        boolean toss = false;
        if (c.shouldContinue())
            toss = (new B()).setCount(c).fun();
        else
            toss = false;
        return true;
    }
}

class B extends A {
    
    Count d;
    
    public A setCount(Count count) {
        d = count;
        c = d;
        return this;
    }
    
    public boolean fun() {
        int toss1 = this.printNum();
        toss1 = d.increment();
        boolean toss = false;
        if (d.shouldContinue())
            toss = (new A()).setCount(d).fun();
        else
            toss = false;
        return true;
    }
}
