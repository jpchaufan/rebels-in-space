function PlayerBullet_1(x, y, dy, dx){
	this.dx = dx || 0;
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
		this.x += this.dx * dt;
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
	shieldsMax: 8,
	shieldRegen: 0,
	alive: true,
	invincible: 0,
	invincibleMax: 6,
	doubleShot: false,
	diagShot: 0,
	diagShotMax: 10,
	shoot: function(){
		sound('laser');
		this.lastFire += this.fireDelay;
		if (player.doubleShot){
			this.bullets.push(new PlayerBullet_1(this.x+this.width/2-5, this.y, this.bulletSpeed));
			this.bullets.push(new PlayerBullet_1(this.x+this.width/2+5, this.y, this.bulletSpeed));
		} else {
			this.bullets.push(new PlayerBullet_1(this.x+this.width/2, this.y, this.bulletSpeed));
		}
		
		if (player.diagShot){
			player.diagShot -= 1;
			this.bullets.push(new PlayerBullet_1(this.x+this.width/2-7.5, this.y, this.bulletSpeed, -60));
			this.bullets.push(new PlayerBullet_1(this.x+this.width/2+7.5, this.y, this.bulletSpeed, 60));
		}
		
	},
	isHurt: function(){
		if (player.alive && !player.invincible){
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
			if (player.invincible){
				ctx.save();
				ctx.shadowColor = "gold"; 
				ctx.shadowOffsetX = 0; 
				ctx.shadowOffsetY = 0; 
				ctx.shadowBlur = 50;
			}
			ctx.drawImage(imageFiles[0], spriteX, spriteY, 16, 24, this.x, this.y, this.width, this.height);
			if (player.invincible){
				ctx.restore();	
			}
			for (var i = 0; i < player.bullets.length; i++) {
				player.bullets[i].draw();
			};	
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
		if ( this.moving.up && this.y > canvas.height*0.1){
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
					enemyDestroy(enemies[k]);
					enemies.splice(k, 1);
					player.bullets.splice(i, 1);
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
		if (player.invincible){
			player.invincible -= dt;
			if (player.invincible < 0){
				player.invincible = 0;
			}
		}
		player.shields += player.shieldRegen * dt;
		if (player.shields > player.shieldsMax){
			player.shields = player.shieldsMax;
		}
	},
	initControls: function(){
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
			if (!upgrading){
				e.preventDefault();
				if (paused){
					paused = false;
					music.play();
				} else {
					paused = true;
					music.pause()
				} 
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
	}
}

