var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var lastTime = Date.now();
var enemies = [];
var score = 0;
var currentRound;
var textColor = 'white';
var roundNum = 0;
var soundsOn = true;
var paused = false;

function drawUI(){
	ctx.fillStyle = textColor;
	ctx.font = '18px Helvetica';
	ctx.fillText('Score: '+score, 5, 20);
	ctx.lineWidth = 4;
	ctx.fillStyle = 'black';
	ctx.save();
	ctx.shadowColor = "white"; 
	ctx.shadowOffsetX = 2; 
	ctx.shadowOffsetY = 2; 
	ctx.shadowBlur = 10
	ctx.fillRect(7, canvas.height-27, canvas.width/3+6, 21);; 
	ctx.restore();
	ctx.fillStyle = 'orange';
	ctx.fillRect(10, canvas.height-25, canvas.width/3*player.shields/player.shieldsMax, 15);
}

function main(){
	var now = Date.now();
    var dt = (now - lastTime) / 1000.0;
	update(dt);
	draw();
	lastTime = now;
	requestAnimFrame(main);	
}

function draw(){
	if (!paused){
		ctx.clearRect(0, 0, canvas.width, canvas.height); // clear screen
		background.draw(); //draw background
		if (enemies.length > 0 ){ //draw enemies
			for (var i = 0; i < enemies.length; i++) {
				enemies[i].draw();
			};
		}
		for (var i = 0; i < enemyBullets.length; i++) { //draw enemy bullets
			enemyBullets[i].draw();
		};
		currentRound.draw(); //draw round info
		player.draw(); // draw player
		for (var i = 0; i < explosions.length; i++) { //  draw explosions
			explosions[i].draw();
		};
		drawUI(); // draw UI
	}
}

function update(dt){
	if (!paused){
		background.update(dt);
		player.update(dt);
		for (var i = 0; i < enemies.length; i++) {
			enemies[i].update(dt);
			if (enemies[i].y > canvas.height || enemies[i].x + enemies[i].width < 0 || enemies[i].x > canvas.width){
				enemies.splice(i, 1);
			}
		};		
		for (var i = 0; i < enemyBullets.length; i++) {
			enemyBullets[i].update(dt);
		};
		enemyBulletsCheck();
		currentRound.update(dt);
		for (var i = 0; i < explosions.length; i++) {
			explosions[i].update(dt);
			if (explosions[i].spriteTick >= 0.35){
				explosions.splice(i, 1);
			}
		};
	}
}







