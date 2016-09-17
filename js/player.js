function Bullet(x, y, dy){
	this.width = 10;
	this.height = 22;
	this.spriteTick = 0;
	this.x = x-this.width/2;
	this.y = y-this.height/2;
	this.dy = dy
	this.draw = function(){
		spriteX = 5;
		if ( this.spriteTick >= 0.125 ){
			spriteX = 17;
		}
		ctx.drawImage(resources[1], spriteX, 16, 8, 13, this.x, this.y, this.width, this.height);
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
	speed: 150,
	bullets: [],
	bulletSpeed: 300,
	shields: 5,
	alive: true,
	shoot: function(){
		this.bullets.push(new Bullet(this.x+this.width/2, this.y, this.bulletSpeed));
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
			ctx.drawImage(resources[0], spriteX, spriteY, 16, 24, this.x, this.y, this.width, this.height);
			for (var i = 0; i < player.bullets.length; i++) {
				player.bullets[i].draw();
			};	
		} else {
			ctx.fillStyle = 'black';
			ctx.font = '40px Helvetica';
			var text = 'Game Over';
			var textWidth = ctx.measureText(text).width;
			ctx.fillText(text, canvas.width/2-textWidth/2, canvas.height/2-20);
		}
		
	},
	update: function(dt){
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
				if (player.shields > 0){
					player.shields -= 1;
				} else {
					player.alive = false;
				}
				break;
			}
			for (var i = 0; i < player.bullets.length; i++) {
				if ( collision(player.bullets[i], enemies[k]) ){
					enemies.splice(k, 1);
					player.bullets.splice(i, 1);
					score += 10;
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
	if (e.keyCode == 37){
		player.moving.left = true;
	}
	if (e.keyCode == 38){
		player.moving.up = true;
	}
	if (e.keyCode == 39){
		player.moving.right = true;
	}
	if (e.keyCode == 40){
		player.moving.down = true;
	}
	if (e.keyCode == 32){
		player.shoot();
	}
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
});