class Main {
    public static void main(String[] args){
        Xargle z = new Xargle();
	Xargle v = new Xargle();
	Pargle p = new Pargle();
	System.out.println(z.fargyle(8));
	System.out.println(v.fargyle(16));
	System.out.println(p.fargyle(32));
	
	System.out.println(z.xargyle(3,4,5,v));
	System.out.println(v.xargyle(0,7,8,p));
	System.out.println(z.xargyle(1,2,3,p));
	System.out.println(z.xargyle(v.xargyle(5,6,7,z),
				     z.xargyle(1,2,1,z),
				     v.xargyle(3,2,1,v),z));
	System.out.println(z.xarglify(z,v));
    }
}
class Argle{
    int argyle;
}

class Bargle extends Argle{
    int bargyle;
}

class Fargle extends Bargle{
    public int fargyle(int foo){
	argyle = foo * 2;
	return argyle;
    }
}

class Pargle extends Fargle{
    public int pargyle(int bar){
	bargyle = (bar - 1) + this.fargyle(bar);
	return bargyle + argyle;
    }
}

class Zargle extends Pargle{
    public int zargyle(int a, Fargle f){
	return this.pargyle(f.fargyle(this.fargyle(a)));
    }
}

class Xargle extends Zargle{
    public int xargyle(int a, int b, int c, Pargle p){
	int q = this.zargyle(this.pargyle(p.pargyle(this.zargyle(a,p))),p);
	return this.zargyle(c-this.zargyle(b,p),p) + q;
    }

    public int argyle(){
	return argyle;
    }

    public int bargyle(){
	return bargyle;
    }

    public int xarglify(Xargle a, Xargle b){
	return a.argyle() + b.argyle();
    }
}