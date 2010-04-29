class TooCoolToBeSquare {
	public static void main(String[] args) {
		Point p = new Point();
		Point q = new Point();
		WrappedPoint pp = new WrappedPoint();
		WrappedPoint qq = new WrappedPoint();
		int temp = 0;

		temp = pp.set(p);
		temp = qq.set(q);
		
		temp = pp.get().set(10, 10);
		temp = qq.get().set(20, 20);
		
		Square s = new Square();
		
		temp = s.set(p, q);
		
		System.out.println(s.getArea());
	}
}

class WrappedPoint {
	Point p;
	
	public Point get() {
		return p;
	}
	
	public int set(Point pp) {
		p = pp;
		return 0;
	}
}

class Point {
	int x;
	int y;
	
	public int set(int x0, int y0) {
		x = x0;
		y = y0;
		return 0;
	}
	
	public Point clone() {
		Point p = new Point();
		int temp = p.set(x, y);
		return p;
	}
	
	public int getX() {
		return x;
	}
	
	public int getY() {
		return y;
	}
}

class Square {
	Point topleft;
	Point bottomright;
	
	public int set(Point tl, Point br) {
		topleft = tl.clone();
		bottomright = br.clone();
		return 0;
	}
	
	public Square clone() {
		Square s = new Square();
		int temp = s.set(topleft, bottomright);
		return s;
	}
	
	public Point getTopLeft() {
		return topleft;
	}
	
	public Point getBottomRight() {
		return bottomright;
	}
	
	public int getArea() {
		return (bottomright.getX() - topleft.getX()) * (bottomright.getY()
				- topleft.getY());
	}
}
