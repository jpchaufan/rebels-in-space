function Round(){
	this.timer = 0;
	this.spawnRate = 0;
	this.update = function(dt){
		this.timer += dt;
		if (this.timer > 3){
			this.spawnRate += dt;	
		}

		
		if (this.spawnRate >= 0.1){
			this.spawnRate -= 0.1;
			var chance = Math.random();
			if (chance>0.3 && enemies.length < 8){
				enemies.push(new Enemy());
			}
		}
	},
	this.draw = function(){
		if (this.timer < 3){
			ctx.fillStyle = 'black';
			ctx.font = '40px Helvetica';
			var text = 'Round 1';
			var textWidth = ctx.measureText(text).width;
			ctx.fillText(text, canvas.width/2-textWidth/2, canvas.height/2-20);
		}
	}
}
currentRound = new Round();