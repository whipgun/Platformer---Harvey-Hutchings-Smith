var Vector2 = function()
{
	this.x = 0;
	this.y = 0;
};

Vector2.prototype.Set = function(x,y)
{
	this.x = x;
	this.y = y;
};

/*Vector2.prototype.CheckCollision = function(Vector2 a_other)
{
	if(a_Other.y + a_Other.height < this.y ||
	 a_Other.x + a_Other.width < this.x ||
	 a_Other.x > this.x + this.width ||
	 a_Other.y > this.y + this.height)
	{
		return false;
	}
	return true;
};*/

Vector2.prototype.Add = function(a_x,a_y)
{
	return (this.x + a_x),(this.y + a_y);
}

Vector2.prototype.Subtract = function(a_x,a_y)
{
	return (this.x - a_x),(this.y - a_y);
}

Vector2.prototype.MultiplyScalar = function(input)
{
	return (this.x * input),(this.y * input);
}

Vector2.prototype.Magnitude = function ()
{

	return Math.sqrt((x*x) + (y*y)) //Gives magnitude of current vector2
}

Vector2.prototype.Normalize = function ()
{

	var rect = new Vector2();
	rect.x = this.x / this.Magnitude();
	rect.y = this.y / this.Magnitude();

	return ret;
}

vec2 = new Vector2();
vec2.Set(5,4);

//if(circle1.radius + circle2.radius > Vector2(circle1 - circle2) * Vector2(circle1 - circle2))