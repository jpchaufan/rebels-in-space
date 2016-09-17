function Enemy(){
	this.rand = Math.random()*10;
	this.x = Math.random()*canvas.width;
	this.y = -30;
	this.width = 30;
	this.height = 30;
	this.color = randColor();
	this.draw = function(){
		ctx.fillStyle = this.color;
		ctx.fillRect(this.x, this.y, this.width, this.height);
	}
	this.update = function(dt){
		this.rand += 0.01;
		this.x += 25*Math.sin(this.rand) * dt;
		this.y += 50 * dt;
	}
}