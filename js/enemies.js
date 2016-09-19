var enemyBullets = [];
function enemyBulletsCheck(){
	for (var i = 0; i < enemyBullets.length; i++) {
		if ( collision(player, enemyBullets[i]) ){
			enemyBullets.splice(i, 1);
			player.isHurt();
		}
	};
}

function enemyDestroy(enemy){
	explosion(enemy.x+enemy.width/2, enemy.y+enemy.height/2, 1.25*max( enemy.height, enemy.width ) );
	score += enemy.points;
	sound('explosion');
	if (Math.random()> 1-powerUpChance){
		dropPowerUp(enemy.x+enemy.width/2, enemy.y+enemy.height);
	}
}

function EnemyBullet_1(x, y, dy, dx){
	this.width = 10;
	this.height = 10;
	this.spriteTick = 0;
	this.x = x-this.width/2;
	this.y = y-this.height/2;
	this.dx = dx || 0;
	this.dy = -dy;
	this.draw = function(){
		spriteX = 5;
		if ( this.spriteTick >= 0.125 ){
			spriteX = 17;
		}
		ctx.drawImage(imageFiles[1], spriteX, 5, 9, 7, this.x, this.y, this.width, this.height);
	},
	this.update = function(dt){
		this.y -= this.dy * dt;
		this.x -= this.dx * dt;
		this.spriteTick += dt;
		if (this.spriteTick > 0.25){
			this.spriteTick -= 0.25;
		}
	}
}
function SmallEnemy(){
	this.points = 10;
	this.rand = Math.random()*10;
	this.x = Math.random()*canvas.width;
	this.y = -30;
	this.width = 30;
	this.height = 30;
	this.spriteTick = 0,
	this.shoot = function(){
		enemyBullets.push(new EnemyBullet_1(this.x+this.width/2-5, this.y+this.height*1.1, 170 + roundNum*5));
	}
	this.draw = function(){
		spriteX = 0;
		if ( this.spriteTick >= 0.3 ){
			spriteX = 16;
		}
		ctx.drawImage(imageFiles[2], spriteX , 0, 16, 15, this.x, this.y, this.width, this.height);
	}
	this.update = function(dt){
		this.spriteTick += dt;
		if (this.spriteTick >= 0.6){
			this.spriteTick -= 0.6;
			if (Math.random()>0.65){
				this.shoot();
			}
		}
		this.rand += 0.01;
		this.x += 45*Math.sin(this.rand) * dt;
		this.y += 40 * dt;
	}
}
function MediumEnemy(){
	this.points = 15;
	this.rand = Math.random()*10;
	this.x = Math.random()*canvas.width;
	this.y = -30;
	this.width = 42;
	this.height = 42;
	this.spriteTick = 0,
	this.shoot = function(){
		enemyBullets.push(new EnemyBullet_1(this.x+this.width/2-10, this.y+this.height*1.1, 220 + roundNum*5));
		enemyBullets.push(new EnemyBullet_1(this.x+this.width/2, this.y+this.height*1.1, 220 + roundNum*5));
	}
	this.draw = function(){
		spriteX = 0;
		if ( this.spriteTick >= 0.3 ){
			spriteX = 32;
		}
		ctx.drawImage(imageFiles[5], spriteX , 0, 32, 16, this.x, this.y, this.width, this.height);
	}
	this.update = function(dt){
		this.spriteTick += dt;
		if (this.spriteTick >= 0.6){
			this.spriteTick -= 0.6;
			if (Math.random()>0.65){
				this.shoot();
			}
		}
		this.rand += 0.01;
		this.x += 45*Math.sin(this.rand) * dt;
		this.y += 30 * dt;
	}
}

function BigEnemy(){
	this.points = 25;
	this.rand = Math.random()*10;
	this.x = Math.random()*canvas.width;
	this.y = -30;
	this.width = 64;
	this.height = 64;
	this.spriteTick = 0,
	this.shoot = function(){
		enemyBullets.push(new EnemyBullet_1(this.x+this.width/2-10, this.y+this.height*1.1, 220 + roundNum*5, -100));
		enemyBullets.push(new EnemyBullet_1(this.x+this.width/2-5, this.y+this.height*1.1, 220 + roundNum*5));
		enemyBullets.push(new EnemyBullet_1(this.x+this.width/2, this.y+this.height*1.1, 220 + roundNum*5, 100));
	}
	this.draw = function(){
		spriteX = 0;
		if ( this.spriteTick >= 0.3 ){
			spriteX = 32;
		}
		ctx.drawImage(imageFiles[6], spriteX , 1, 31, 31, this.x, this.y, this.width, this.height);
	}
	this.update = function(dt){
		this.spriteTick += dt;
		if (this.spriteTick >= 0.6){
			this.spriteTick -= 0.6;
			if (Math.random()>0.6){
				this.shoot();
			}
		}
		this.rand += 0.01;
		this.x += 45*Math.sin(this.rand) * dt;
		this.y += 30 * dt;
	}
}