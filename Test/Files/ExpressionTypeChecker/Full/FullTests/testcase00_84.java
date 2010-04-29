class test3 
{
	public static void main(String[] args) 
	{
		textbook a = new eopl();
		humanities b = new humanities();
		
		int x = 3;
		boolean y = false;
		
		if(b.init()) 
			System.out.println(-1);
		else
			System.out.println (1);
		
		if(!b.openBook(1000))
			y = b.openBook(1);
		else
			x = 4;
		
		
		System.out.println(a.getPages());
		System.out.println (b.getPages());
		if(a.getHardBound()&&b.getHardBound())
			System.out.println (1);
		else
			System.out.println (0);
		
		System.out.println (a.getPageNumber());
		if(a.getPageNumber()>0)
			y = a.closeBook();
		else
			x = 2;
				
		System.out.println (a.getPageNumber());
		

		textbook d = b.askMe();	/* exception handling? null.closeBook() */

		y = d.closeBook();
		
		y = a.closeBook();
		y = b.closeBook();
		
		if(a.getPageNumber() == 0 && b.getPageNumber() == 0)
			System.out.println (1);
		else
			x = 74;	
			
		y = a.openBook(5);
		
		
		a = b;
		
		if(a==b)
			System.out.println (1);
		else	
			System.out.println (-1);
		if(a.getPages() == b.getPages())
			System.out.println (1);
		else
			System.out.println (-1);
		
	}
}

class textbook
{
	int pages;
	boolean hardBound;
	int pageNumber;
	
	public int getPages(){ return pages;
	}
	
	public boolean setPages(int x){ pages = x; return true;
	}
	
	public boolean setHardBound(boolean y){ hardBound = y; return false;
	}
	
	public boolean getHardBound (){ return hardBound;
	}
	
	public int getPageNumber(){ return pageNumber;
	}
	
	public boolean setPageNumber(int x){ pageNumber = x; return true;
	}
	
	
	public boolean openBook(int pN)
	{
		boolean flag = false;
		if(pN>pages||pN<0)
		{
			System.out.println (-pN);
			flag = false;
		}
		else
		{
			pageNumber = pN;	
			flag = true;
		}
		
		return flag;
	}
	
	public boolean closeBook()
	{
		pageNumber = 0;
		return true;
	}
}

class humanities extends textbook
{
	public boolean init()
	{
		pages = 150;
		hardBound = false;
		pageNumber = 0;
		return false;
	}
	
	public textbook askMe()
	{
		return null;
	}
}

class eopl extends textbook
{
	public boolean init()
	{
		pages = 300;
		hardBound = true;
		
		
		
		pageNumber = 0;
		return true;
	}
	
	public textbook askMe()
	{
		return this;
	}
}
