class main {
	public static void main (String[] args) {
		Animal	animal	=	new Cat();
		Animal	animal2	=	new Dog();
	}
}

class Animal {
	public Animal()
	{
		System.out.println(0);
	}

}

class Cat extends Animal{
	public Cat()
	{
		System.out.println(1);
	}


}

class Dog extends Animal{
	public Dog()
	{
		System.out.println(2);
	}


}