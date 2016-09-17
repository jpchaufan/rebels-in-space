function randColor(){
	var color = '#';
	for (var i = 0; i < 6; i++) {
		color += Math.floor(Math.random()*9+1);
	};
	return color;
}
function collision(one, two){
	if ( one.x+one.width >= two.x && one.x <= two.x+two.width &&
		one.y <= two.y+two.height && one.y+one.height >= two.y ){
		return true;
	}
	return false;
}




var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var lastTime = Date.now();
var enemies = [];
var score = 0;
var currentRound;

function drawUI(){
	ctx.fillStyle = 'black';
	ctx.font = '18px Helvetica';
	ctx.fillText('Score: '+score, 5, 20);
	ctx.fillText('Shields: '+player.shields, 5, canvas.height-20)
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

function main(){
	var now = Date.now();
    var dt = (now - lastTime) / 1000.0;
	update(dt);
	draw();
	lastTime = now;
	requestAnimFrame(main);	
}

function draw(){
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	if (enemies.length > 0 ){
		for (var i = 0; i < enemies.length; i++) {
			enemies[i].draw();
			if (enemies[i].y > canvas.height || enemies[i].x < 0 || enemies[i].x > canvas.width){
				enemies.splice(i, 1);
			}
		};
	}
	currentRound.draw();
	player.draw();
	drawUI();
}
function update(dt){
	player.update(dt);
	for (var i = 0; i < enemies.length; i++) {
		enemies[i].update(dt);
	};
	currentRound.update(dt);
}


var resources = [];
var loaded = 0;

function addImg(source){
	resources.push(new Image());
	resources[resources.length-1].src = source;	
}
addImg("space_shooter_pack/spritesheets/ship.png");
addImg("space_shooter_pack/spritesheets/laser-bolts.png");
addImg("space_shooter_pack/spritesheets/enemy-small.png")

for (var i = 0; i < resources.length; i++) {
	resources[i].onload = function(){
		loaded += 1;
		if (resources.length == loaded){
			main();
		}
	}
};








