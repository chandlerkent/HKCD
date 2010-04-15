class Main{public static void main(String[]	args){System.out.println(0);}}
class List{
List next;
int element;
public int get(int i){if(i==0)return this.element;else return null;}

public set(int index, int value){
	if(index==0){
		this.element = value;
	} else {
		//this null check makes it invalid minijava because there's no else block.
		if(next.element==null){
			next = new List();
		}	
		return next.set(index-1,value);
	}
}
}
