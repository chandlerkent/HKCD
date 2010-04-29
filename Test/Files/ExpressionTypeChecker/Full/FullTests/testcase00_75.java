class Main {
	public static void main(String[] args) {
		LinkedList root = new LinkedList();
		int waste = root.initialize();
		
		FibLoop fil = new FibLoop();
		waste = fil.creator(20, root);
		waste = fil.printor(20, root);
		
		FactLoop fal = new FactLoop();
		waste = fal.creator(40, root);
		waste = fal.printor(40, root);		
	}
}

class INeedAForLoop {
	boolean flag;
	
	public int f(int n) {
		return 0;
	}
	
	public int creator(int n, LinkedList root) {
		if(n >= 0) {
			int waste = root.set(n, this.f(n));
		} else {
			int waste = 0;
		}
		return 0;
	}
	
	public int printor(int n, LinkedList root) {
		if(n >= 0) {
			System.out.println(root.get(n));
		} else {
			int waste = 0;
		}
		return 0;
	}
}

class FibLoop extends INeedAForLoop {
	public int fibhelper(int n, int next, int last) {
		int result = 0;
		if(n == 0)
			result = last;
		else
			result = this.fibhelper(n - 1, next + last, next);
		return result;
	}

	public int f(int n) {
		flag = true;
		return this.fibhelper(n, 1, 0); 
	}
}

class FactLoop extends INeedAForLoop {
	public int facthelper(int n, int last) {
		int result = 0;
		if(n == 0)
			result = last;
		else
			result = this.facthelper(n - 1, n * last);
		return result;
	}

	public int f(int n) {
		flag = true;		
		return this.facthelper(n, 1); 
	}
}

class LinkedList {
	int here;
	LinkedList next;
	boolean nextExists;

	// My own constructor contract
	public int initialize() {
		here = 0;
		next = null;
		return 1;
	}
	
	public int set(int index, int value) {
		int result = 0;
		if(index == 0) {
			here = value;
			result = value;
		} else {
			// Dynamic expansion
			if(next != null) {
				result = next.set(index - 1, value);
			} else {
				next = new LinkedList();
				int waste = next.initialize();
				result = next.set(index - 1, value);
			}
		}
		return result;
	}
	
	public int get(int index) {
		int result = 0;
		if(index == 0) {
			result = here;
		} else {
			if(next != null)
				result = next.get(index - 1);
			else
				int waste = 0;
		}
		return result;
	}	
}