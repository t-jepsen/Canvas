(function(){
	$(document).ready(function(){

		var game = {};
		game.stars = [];

		game.width = 550;
		game.height = 600;

		game.keys = [];

		game.images = [];
		game.doneImages = 0;
		game.requiredImages = 0;

		game.player = {
			x: game.width / 2 - 50,
			y: game.height - 110,
			width: 100,
			height: 100,
			speed: 3

		};

		game.contextBackground = document.getElementById("backgroundCanvas").getContext("2d");
		game.contextPlayer = document.getElementById("playerCanvas").getContext("2d");

		$(document).keydown(function(e){
			game.keys[e.keyCode ? e.keyCode : e.which] = true;
		});


		$(document).keyup(function(e){
			delete game.keys[e.keyCode ? e.keyCode : e.which];
		});
		function init(){
			for (i = 0; i <600; i++) {
				game.stars.push({
					x: Math.floor(Math.random() * game.width),
					y: Math.floor(Math.random() * game.height),
					size: Math.random() * 5
				});
			}
		//	game.contextPlayer.drawImage(game.images[2], 10, 10, 30, 50);
			loop();
		}

		function addStars(num){
			for (i = 0; i <num; i++) {
				game.stars.push({
					x: Math.floor(Math.random() * game.width),
					y: game.height + 10,
					size: Math.random() * 5
				});
			}
		}
		/* 
			up - 38
		 	down - 40
		 	left - 37
		 	right - 39

		 	w - 87
		 	a - 65
		 	s - 83
		 	d - 68

		 	space - 32
		*/
		function update(){
			addStars(1);

			for (i in game.stars){
				if (game.stars[i].y <= -5) {
					 game.stars.splice(i, 1)
				}
				game.stars[i].y--;
			}

			if (game.keys[37] || game.keys[65]) {
				 game.player.x-=game.player.speed;
			}

			if (game.keys[39] || game.keys[68]) {
				 game.player.x+=game.player.speed;
			}
		}

		function render(){
			game.contextBackground.clearRect(0, 0, game.width, game.height);
			game.contextBackground.fillStyle = "white";
			for(i in game.stars){
				 var star = game.stars[i];
			   	 game.contextBackground.fillRect(star.x, star.y, star.size, star.size);
			}

			game.contextPlayer.clearRect(0, 0, game.width, game.height);
			game.contextPlayer.drawImage(game.images[2], 10, 10, 35, 35);

/*
Virker ikke

            game.contextPlayer.clearRect(game.player.x, game.player.y, game.player.width, game.player.height);	
			*/
			game.contextPlayer.drawImage(game.images[0], game.player.x, game.player.y, game.player.width, game.player.height);
		}

		function loop(){
			requestAnimFrame(function(){
				loop();
			});
			update();
			render();
		}

		function initImages(path){
			game.requiredImages = path.length;
			for(i in path){
				var img = new Image;
				img.src = path[i];
				game.images[i] = img;
				game.images[i].onload = function(){
					game.doneImages++;
				}
			}
		}
		function checkImages(){
			if (game.doneImages >= game.requiredImages) {
				init();
			}else{
				setTimeout(function(){
					checkImages();
				}, 1);
			}
		}
		game.contextBackground.font = "bold 50px monaco";
		game.contextBackground.fillStyle = "lightblue";
		game.contextBackground.fillText("loading.. :)", game.width / 2 - 100, game.height / 2 - 25);
		initImages(["player.png", "enemy.jpg", "http://vignette1.wikia.nocookie.net/fantendo/images/b/b2/Golden_Bill_NSMB2.png/revision/latest?cb=20120813143650"]);
		checkImages();
	});
})();

window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();



/*
var width="500", height="400", speed=3;

var keys = [];
var player = {
	x: 10,
	y: 10,
	width: 20,
	height: 20
};

window.addEventListener("keydown", function(e){
	keys[e.keyCode] = true;
}, false);

window.addEventListener("keyup", function(e){
	delete keys[e.keyCode];
}, false);

function game(){
	update();
	render();
}

function update(){
	if(keys[38]) player.y-=speed;
	if(keys[40]) player.y+=speed;
	if(keys[37]) player.x-=speed;
	if(keys[39]) player.x+=speed;

	if(player.x < 0) player.x = 0;
	if(player.y < 0) player.y = 0;
	if(player.x >= width - player.width) player.x = width - player.width;
	if(player.y >= height - player.height) player.y = height - player.height;
}

function render(){
	context.clearRect(0, 0, width, height);
	context.fillRect(player.x, player.y, player.width, player.height);
} 

setInterval(function(){
	game();
}, 1000/30)

*/
