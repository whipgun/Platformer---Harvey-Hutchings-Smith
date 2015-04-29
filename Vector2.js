var Vector2 = function()
{
	this.x = 0;
	this.y = 0;
	this.width = 0;
	this.height = 0;
};

Vector2.Prototype.Set = function(a_x,a_y)
{
	this.x = a_x;
	this.y = a_y;
};
Vector2.Prototype.CheckCollision = function(Vector2 a_other)
{
	if(a_Other.y + a_Other.height < this.y ||
	 a_Other.x + a_Other.width < this.x ||
	 a_Other.x > this.x + this.width ||
	 a_Other.y > this.y + this.height)
	{
		return false;
	}
	return true;
};

vec2 = new Vector2();
vec2.Set(5,4);

Player.position.CheckCollision(Asteroid.position)

x = x * num
y = y * num

