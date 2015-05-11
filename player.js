var Player = function() {
	this.image = document.createElement("img");
	this.position = new Vector2();
	this.width = 159;
	this.height = 163;
	this.RotSpeed = 2;
	this.image.src = "hero.png";
};

Player.prototype.update = function(deltaTime)
{

}

Player.prototype.draw = function()
{
	context.save();
		context.translate(this.x, this.y);
		context.rotate(this.rotation);
		context.drawImage(this.image, -this.width/2, -this.height/2);
	context.restore();
}