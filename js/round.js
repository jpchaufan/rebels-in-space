function Round(num){
	this.roundNum = num;
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
			if (chance>0.92 && enemies.length < 7 + roundNum*2){
				enemies.push(new SmallEnemy());
			} else if (chance > 0.85 && enemies.length < 7 + roundNum*2){
				enemies.push(new MediumEnemy());
			} else if (chance > 0.8 && enemies.length < 7 + roundNum*2 && roundNum > 1){
				enemies.push(new BigEnemy());
			}
		}
		if (this.timer >= 45 && player.alive){
			nextRound();
		}
	},
	this.draw = function(){
		if (this.timer < 3){
			ctx.fillStyle = textColor;
			ctx.font = '40px Helvetica';
			var text = 'Round '+this.roundNum;
			var textWidth = ctx.measureText(text).width;
			ctx.fillText(text, canvas.width/2-textWidth/2, canvas.height/2-20);
			ctx.font = '16px Helvetica';
			var text = "'s' for sound, 'p' for pause";
			var textWidth = ctx.measureText(text).width;
			ctx.fillText(text, canvas.width/2-textWidth/2, canvas.height/2+20);
		}
	}
}

function nextRound(){
	enemies = [];
	enemyBullets = [];
	roundNum += 1;
	currentRound = new Round(roundNum);
	player.shields = player.shieldsMax;
}
nextRound();
