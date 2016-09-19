function pointInArea(pointx, pointy, areax, areay, areaw, areah){
	if (pointx >= areax && pointx <= areax+areaw && pointy >= areay && pointy <= areay+areah){
		return true;
	}
	return false;
}

var upgrading = false;

var powerUps = [];
var powerUpChance = 0.015;
	
function PowerUp(x, y){
	this.type = 'offensive';
	this.spriteY = 0;
	if (Math.random()>0.5){
		this.type = 'defensive';
		this.spriteY = 16;
	}
	this.x = x;
	this.y = y;
	this.width = 25;
	this.height = 25;
	this.dy = 80;
	this.spriteTick = 0;
	this.draw = function(){
		var spriteX = 0;
		if (this.spriteTick >= .5){
			spriteX = 16;
		}
		ctx.drawImage(imageFiles[9], spriteX, this.spriteY, 16, 16, this.x, this.y, this.width, this.height);
	}
	this.update = function(dt){
		this.y += this.dy * dt;
		this.spriteTick += dt;
		if (this.spriteTick >= 1){
			this.spriteTick = 0;
		}
	}
}

function collectPowerUp(){
	for (var i = 0; i < powerUps.length; i++) {
		if ( collision(player, powerUps[i]) ){
			if ( powerUps[i].type == 'offensive' ){
				player.diagShot = player.diagShotMax;	
			} else {
				player.invincible = player.invincibleMax;
			}
			
			powerUps.splice(i, 1);
		}
	};
}

function dropPowerUp(x, y){
	powerUps.push(new PowerUp(x, y));
}
var upgradeTypes = [
	{
		name: "Ship Speed",
		upgrade: function(){
			player.speed += 40;
		},
		available: function(){
			if (player.speed < 300){
				return true;
			}
		}
	},
	{
		name: "Firing Speed",
		upgrade: function(){
			player.fireDelay -= .05;
		},
		available: function(){
			if (player.fireDelay >= 0.15){
				return true;
			}
		}
	},
	{
		name: "Shields",
		upgrade: function(){
			player.shieldsMax += 1;
			player.shields += 1;
		},
		available: function(){
			return true;
		}
	},
	{
		name: "Double Shot",
		upgrade: function(){
			player.doubleShot = true
		},
		available: function(){
			if (!player.doubleShot){
				return true;
			}
		}
	},
	{
		name: "More Diagonal Shots",
		upgrade: function(){
			player.diagShotMax += 5;
		},
		available: function(){
			return true;
		}
	},
	{
		name: "Longer Invincibility",
		upgrade: function(){
			player.invincibleMax += 2;
		},
		available: function(){
			if (player.invincibleMax <= 12){
				return true;
			}
		}
	},
	{
		name: "Shield Repair",
		upgrade: function(){
			player.shieldRegen += 0.2;
		},
		available: function(){
			if (player.shieldRegen <= 3){
				return true;
			}
		}
	}
];
function Upgrade(id){
	this.id = id
	this.name = upgradeTypes[this.id].name;
	this.upgrade = upgradeTypes[this.id].upgrade;
}

var upgrades = {
	option1: {
		upgrade: undefined,
		x: canvas.width*0.2,
		y: canvas.height*0.2,
		width: canvas.width*0.6,
		height: canvas.height*0.175
	},
	option2: {
		upgrade: undefined,
		x: canvas.width*0.2,
		y: canvas.height*0.425,
		width: canvas.width*0.6,
		height: canvas.height*0.175
	},
	option3: {
		upgrade: undefined,
		x: canvas.width*0.2,
		y: canvas.height*0.65,
		width: canvas.width*0.6,
		height: canvas.height*0.175
	},
	draw: function(){
		ctx.drawImage(imageFiles[8], 1, 28, 221, 132, canvas.width*0.1, canvas.height*0.1, canvas.width*0.8, canvas.height*0.8);
		ctx.fillStyle = textColor;
		ctx.font = '16px Helvetica';
		var text = "Choose an Upgrade:";
		var textWidth = ctx.measureText(text).width;
		ctx.fillText(text, canvas.width/2-textWidth/2, canvas.height*0.2-18);
		for (var i = 1; i <= 3; i++) {
		ctx.drawImage(imageFiles[8], 0, 0, 98, 26, upgrades['option'+i].x, upgrades['option'+i].y, upgrades['option'+i].width, upgrades['option'+i].height);
		var text = upgrades['option'+i].upgrade.name;
		var textWidth = ctx.measureText(text).width;
		ctx.fillText(text, upgrades['option'+i].x+upgrades['option'+i].width/2-textWidth/2, upgrades['option'+i].y+upgrades['option'+i].height/2);
		};
	},
	generate: function(){
		var workingOn = 1;
		var numsAry = [];
		for (var i = 0; i < upgradeTypes.length; i++) {
			numsAry.push(i);
		};
		while ( !(workingOn >= 4 || numsAry.length == 0) ){
			var num = numsAry[Math.floor(Math.random()*numsAry.length)];
			numsAry.splice(numsAry.indexOf(num), 1);
			if (upgradeTypes[num].available()){
				upgrades['option'+workingOn].upgrade = new Upgrade(num);
				workingOn++;
			}
		}
	},
	updateAvailabeUpgrades: function(){
		for (var i = 0; i < upgradeTypes.length; i++) {
			if (!upgradeTypes[i].available()){
				upgradeTypes.splice(i, 1);
			}
		};
	}
}

function offerUpgrades(){
	upgrades.generate();
	upgrading = true;
	paused = true;
}
function doneUpgrading(){
	currentRound.upgradeGiven = true;
	upgrading = false;
	paused = false;
	upgrades.updateAvailabeUpgrades();
	nextRound();
}





