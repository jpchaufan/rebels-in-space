function PlayerBullet_1(x, y, dy){
	this.width = 10;
	this.height = 22;
	this.spriteTick = 0;
	this.x = x-this.width/2;
	this.y = y-this.height/2;
	this.dy = dy;
	this.draw = function(){
		spriteX = 5;
		if ( this.spriteTick >= 0.125 ){
			spriteX = 17;
		}
		ctx.drawImage(imageFiles[1], spriteX, 16, 8, 13, this.x, this.y, this.width, this.height);
	},
	this.update = function(dt){
		this.y -= this.dy * dt;
		this.spriteTick += dt;
		if (this.spriteTick > 0.25){
			this.spriteTick -= 0.25;
		}
	}
}

player = {
	width: 35,
	height: 35,
	x: canvas.width/2-10,
	y: canvas.height*0.8,
	moving: {
		left: false,
		right: false,
		Up: false,
		down: false
	},
	firing: false,
	speed: 150,
	bullets: [],
	bulletSpeed: 300,
	fireDelay: .25,
	lastFire: 0,
	shields: 5,
	shieldsMax: 5,
	alive: true,
	shoot: function(){
		sound('laser');
		this.lastFire += this.fireDelay;
		this.bullets.push(new PlayerBullet_1(this.x+this.width/2, this.y, this.bulletSpeed));
	},
	isHurt: function(){
		if (player.alive){
			if (player.shields > 0){
				player.shields -= 1;
				explosion(this.x+this.width/2, this.y+this.height/2, 20);
			} else {
				player.alive = false;
				explosion(this.x+this.width/2, this.y+this.height/2, 80);
			}
		}
	},
	spriteTick: 0,
	draw: function(){
		if (player.alive){
			var spriteY = 24;
			if (player.spriteTick >= 0.15){
				spriteY = 0;
			}
			var spriteX = 32;
			if (player.moving.right){
				spriteX = 49;
			} else if (player.moving.left){
				spriteX = 16;
			}
			ctx.drawImage(imageFiles[0], spriteX, spriteY, 16, 24, this.x, this.y, this.width, this.height);
			for (var i = 0; i < player.bullets.length; i++) {
				player.bullets[i].draw();
			};	
		} else {
			ctx.fillStyle = textColor;
			ctx.font = '40px Helvetica';
			var text = 'Game Over';
			var textWidth = ctx.measureText(text).width;
			ctx.fillText(text, canvas.width/2-textWidth/2, canvas.height/2-20);
		}
		
	},
	update: function(dt){
		player.lastFire -= dt;
		if (player.lastFire < 0){
			player.lastFire = 0;
		}
		if (player.firing && player.lastFire == 0){
			player.shoot();
		}
		player.spriteTick += 1*dt;
		if (player.spriteTick > .3){
			player.spriteTick -= .3;
		}
		if ( this.moving.left && this.x > 0 ){
			this.x -= this.speed * dt;
		}
		if ( this.moving.right && this.x < canvas.width-this.width ){
			this.x += this.speed * dt;
		}
		if ( this.moving.up && this.y > canvas.height/2){
			this.y -= this.speed * dt;
		}
		if ( this.moving.down && this.y+this.height < canvas.height ){
			this.y += this.speed * dt;
		}
		for (var k = 0; k < enemies.length; k++) {
			if ( collision(player, enemies[k]) ){
				enemies.splice(k, 1);
				player.isHurt();
				break;
			}
			for (var i = 0; i < player.bullets.length; i++) {
				if ( collision(player.bullets[i], enemies[k]) ){
					explosion(enemies[k].x+enemies[k].width/2, enemies[k].y+enemies[k].height/2, 1.25*max( enemies[k].height, enemies[k].width ) );
					score += enemies[k].points;
					enemies.splice(k, 1);
					player.bullets.splice(i, 1);
					sound('explosion');
					break;
				}
			};
		};
		for (var i = 0; i < player.bullets.length; i++) {
			player.bullets[i].draw();
			player.bullets[i].update(dt);
			if (player.bullets[i].y < 0){
				player.bullets.splice(i, 1);
			}
		};
	}
}
document.addEventListener('keydown', function(e){
	if (player.alive){
		if (e.keyCode == 37){
			e.preventDefault();
			player.moving.left = true;
		}
		if (e.keyCode == 38){
			e.preventDefault();
			player.moving.up = true;
		}
		if (e.keyCode == 39){
			e.preventDefault();
			player.moving.right = true;
		}
		if (e.keyCode == 40){
			e.preventDefault();
			player.moving.down = true;
		}
		if (e.keyCode == 32){
			e.preventDefault();
			player.firing = true;
		}	
	}
	if (e.keyCode == 83){
		e.preventDefault();
		if (soundsOn){
			soundsOn = false;
			music.muted = true;
		} else {
			soundsOn = true;
			music.muted = false;
		}
	}
	if (e.keyCode == 80){
		e.preventDefault();
		if (paused){
			paused = false;
			music.play();
		} else {
			paused = true;
			music.pause()
		} 
	}
	// console.log(e.keyCode);
});
document.addEventListener('keyup', function(e){
	if (e.keyCode == 37){
		player.moving.left = false;
	}
	if (e.keyCode == 38){
		player.moving.up = false;
	}
	if (e.keyCode == 39){
		player.moving.right = false;
	}
	if (e.keyCode == 40){
		player.moving.down = false;
	}
	if (e.keyCode == 32){
		player.firing = false;
	}
});