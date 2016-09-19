function Round(num){
	this.roundNum = num;
	this.cleared = false;
	this.upgradeOffered = false;
	this.upgradeGiven = false;
	this.timer = 0;
	this.spawnRate = 0;
	this.roundLength = 59 + this.roundNum;
	this.update = function(dt){
		this.timer += dt;
		if (this.timer > 3){
			this.spawnRate += dt;	
		}
		if (this.spawnRate >= 0.05){
			this.spawnRate -= 0.05;
			var chance = Math.random();
			if (chance>0.75 && enemies.length < 3 + roundNum*1.5){
				enemies.push(new SmallEnemy());
			} else if (chance > 0.6 && enemies.length < 3 + roundNum*1.5 && roundNum > 1){
				enemies.push(new MediumEnemy());
			} else if (chance > 0.5 && enemies.length < 3 + roundNum*1.5 && roundNum > 2){
				enemies.push(new BigEnemy());
			}
		}
		if (this.timer >= this.roundLength && player.alive){
			roundCleared()
		}
		if (this.timer >= this.roundLength+2 && this.cleared && !this.upgradeOffered){
			this.upgradeOffered = true;
			offerUpgrades();
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
		} else if (this.cleared){
			ctx.fillStyle = textColor;
			ctx.font = '40px Helvetica';
			var text = 'Round Cleared!';
			var textWidth = ctx.measureText(text).width;
			ctx.fillText(text, canvas.width/2-textWidth/2, canvas.height/2-20);
		}
	}
}
function roundCleared(){
	enemies = [];
	enemyBullets = [];
	player.shields = player.shieldsMax;
	currentRound.cleared = true;
}
function nextRound(){
	roundNum += 1;
	currentRound = new Round(roundNum);
}
nextRound();
