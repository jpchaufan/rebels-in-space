var explosions = [];
function Explosion(x, y, size){
	this.size = size || 20;
	this.x = x-this.size/2;
	this.y = y-this.size/2;
	this.spriteTick = 0;
	this.draw = function(){
		spriteX = 0
		if (this.spriteTick > 0.275){
			spriteX = 65;
		} else 
		if (this.spriteTick > 0.2){
			spriteX = 47;
		} else if (this.spriteTick > 0.125){
			spriteX = 30;
		} else if (this.spriteTick > 0.075){
			spriteX = 15;
		}
		ctx.drawImage(imageFiles[4], spriteX, 0, 17, 16, this.x, this.y, this.size, this.size);
	},
	this.update = function(dt){
		this.spriteTick += dt;
	}
}
function explosion(x, y, size){
	explosions.push(new Explosion(x, y, size));
}
function max(a, b){
	if (a > b){
		return a;
	}
	return b;
}

function collision(one, two){
	if ( one.x+one.width >= two.x && one.x <= two.x+two.width &&
		one.y <= two.y+two.height && one.y+one.height >= two.y ){
		return true;
	}
	return false;
}




var imageFiles = [];
var soundFiles = [];
var loaded = 0;


function addImg(source){
	imageFiles.push(new Image());
	imageFiles[imageFiles.length-1].src = source;	
}
addImg("space_shooter_pack/spritesheets/ship.png"); // 0
addImg("space_shooter_pack/spritesheets/laser-bolts.png"); // 1
addImg("space_shooter_pack/spritesheets/enemy-small.png"); // 2
addImg("space_shooter_pack/backgrounds/desert-background-looped.png") // 3
addImg("space_shooter_pack/spritesheets/explosion.png") // 4
addImg("space_shooter_pack/spritesheets/enemy-medium.png"); // 5
addImg("space_shooter_pack/spritesheets/enemy-big.png"); // 6
addImg("space_shooter_pack/backgrounds/clouds-transparent.png") // 7

//addSound("sound/flight-master-short.wav"); // 0

for (var i = 0; i < imageFiles.length; i++) {
	imageFiles[i].onload = function(){
		loaded += 1;
		startWhenReady();
	}
};

function startWhenReady(){
	if (imageFiles.length == loaded){
		main();
		nextSong();
		if (!soundsOn){
			music.muted = true;
		}
	}
}
var song = 0;
var music = new Audio('sound/light-rock-1.1.mp3'); 
function nextSong(){
	song += 1;
	if (song > 4){
		song = 1;
	}
	music.currentTime = 0;
	music.pause();
	music = new Audio('sound/light-rock-1.'+song+'.mp3');
	music.addEventListener('ended', function() {
	    nextSong();
	}, false);
	music.play();
}


var soundEffects = {};
soundEffects['laser'] = new Audio('sound/laser-01.wav');
soundEffects['laser'].volume = 0.05;
soundEffects['explosion'] = new Audio('sound/8-bit-explosion.wav');
soundEffects['explosion'].volume = 0.3;
function sound(name){
	if (soundsOn){
		soundEffects[name].currentTime = 0;
		soundEffects[name].play();
	}
}

var background = {
	width: 256,
	height: 608,
	y: 304,
	scrollSpeed: 25,
	draw: function(){
		ctx.drawImage(imageFiles[3], 0, this.y, this.width, this.height/2, 0, 0, canvas.width, canvas.height);
		for (var i = 0; i < clouds.length; i++) {
			clouds[i].draw();
		};
	},
	update: function(dt){
		this.y -= this.scrollSpeed*dt;
		if (this.y <= 0){
			this.y = 304;
		}
		if (clouds.length <= 9 && Math.random() > 0.9995){
			clouds.push(new Cloud());
		}
		for (var i = 0; i < clouds.length; i++) {
			clouds[i].update(dt);
			if (clouds[i].y > canvas.height){
				clouds.splice(i, 1);
			}
		};
	}
}
var clouds = [];
function Cloud(){
	this.width = canvas.width;
	this.height = 103;
	this.x = 0;
	this.y = -this.height;
	this.speed = background.scrollSpeed/2+Math.random()*background.scrollSpeed;
	this.draw = function(){
		ctx.drawImage(imageFiles[7], 0, 0, 256, 103, this.x, this.y, this.width, this.height);
	}
	this.update = function(dt){
		this.y += this.speed * dt;
	}
}



window.requestAnimFrame = (function(){ 
  return  window.requestAnimationFrame       ||  
          window.webkitRequestAnimationFrame ||  
          window.mozRequestAnimationFrame    ||  
          window.oRequestAnimationFrame      ||  
          window.msRequestAnimationFrame     ||  
          function( callback ){ 
            window.setTimeout(callback, 1000 / 60); 
          }; 
})();