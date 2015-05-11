var Vector2 = function()
{
	this.x = 0;
	this.y = 0;
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

Vector2.Prototype.Add = function(a_x,a_y)
{
	return (this.x + a_x),(this.y + a_y);
}

Vector2.Prototype.Subtract = function(a_x,a_y)
{
	return (this.x - a_x),(this.y - a_y);
}

Vector2.Prototype.MultiplyScalar = function(input)
{
	return (this.x * input),(this.y * input);
}

Vector2.Prototype.Magnitude = function ()
{

	return Math.sqrt((x*x) + (y*y)) //Gives magnitude of current vector2
}

Vector2.Prototype.Normalized = function ()
{

	Vector2 ret = new Vector2();
	ret.x = this.x / this.Magnitude();
	ret.y = this.y / this.Magnitude();

	return ret;
}

vec2 = new Vector2();
vec2.Set(5,4);

if(circle1.radius + circle2.radius > Vector2(circle1 - circle2) * Vector2(circle1 - circle2))