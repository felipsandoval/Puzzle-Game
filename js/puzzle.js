/*
    JavaScript code of Puzzle Game.
    Made by Felipe Sandoval for CSAAI.
*/

var images = [];
var randoms = [];
var folder;
var winning = [];
var seconds = 0;
var minutes = 0;
var hours = 0;
var countingInterval;
var carouselInterval;
var you_win = function(){
	for (i=0; i < images.length; i++){
		if (images[i].replace(/^f.*[\\\/]/, '').split(".")[0] !== winning[i]){
				return false;
		};
	};
	return true;
}; // para saber si gano o no!
var myIndex1 = 0;
var myIndex2 = 0;
var myIndex3 = 0;
var highscore;
var player;

// para gestionar mi slider
function carousel() {
    var i;
		var x = document.getElementsByClassName("slide1");
		for(i=0; i<x.length; i++) {
				x[i].style.display = "none";
		}
		myIndex1++;
		if (myIndex1 > x.length) {myIndex1 = 1};  
		x[myIndex1-1].style.display = "inline";
		
		x = document.getElementsByClassName("slide2");
		for(i=0; i<x.length; i++) {
				x[i].style.display = "none";
		}
		myIndex2++;
		if (myIndex2 > x.length) {myIndex2 = 1};  
		x[myIndex2-1].style.display = "inline";
		
		x = document.getElementsByClassName("slide3");
		for(i=0; i<x.length; i++) {
				x[i].style.display = "none";
		}
		myIndex3++;
		if (myIndex3 > x.length) {myIndex3 = 1};  
		x[myIndex2-1].style.display = "inline";
};

// para depurar
function show(event) {
  switch (event.code) {
	case "ArrowUp":
		console.log(winning);
		}
};

// Contador para mi pagina
function start_counting(){
	var counter = hours + ":" + minutes + ":" + seconds;
	seconds += 1;
	if (seconds == 60) {
		minutes += 1;
		seconds = 0;
		if (minutes == 60){
			hours += 1;
			minutes = 0;
		}
	}
	document.getElementById("counter").innerHTML = counter;
};

// Para cambiar los elementos de mi array
var swapArrayElements = function(arr, indexA, indexB) {
  var temp = arr[indexA];
  arr[indexA] = arr[indexB];
  arr[indexB] = temp;
};

// Lo añado como propiedad y hacer su uso más fluido
Array.prototype.swap = function(indexA, indexB) {
   swapArrayElements(this, indexA, indexB);
};

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

// para poner las imagenes en aleatorio
function randomimage(){
	var type = document.getElementById("imageType").src;
	var rand = "pos"
	var num;
	var put_black;
	randoms = [];
	for(i=1; i<10; i++){
		rand = "pos" + i;
		num = getRandomInt(1, 9);
		while (randoms.includes(num)){
			num = getRandomInt(1, 9);
		}
		randoms.push(num);
		if (num == 9) {
			put_black = true;
		}
		if (put_black){
			document.getElementById(rand).src = "black.jpg";
			put_black = false;
		}else{
			document.getElementById(rand).src = folder + num + ".jpg"};
	}
}

// Obtengo los valores iniciales de mis imagenes
function getValues(){
	carousel();
	folder = document.getElementById("imageType").src.replace(/^f.*[\\\/]/, '').split(".")[0];
	winning = [folder + "1", folder + "2", folder + "3", folder + "4", folder + "5", 
						 folder + "6", folder + "7", folder + "8", "black"];
	randomimage();
	for(i=1; i<10; i++){
		pos = "pos" + i;
		img = document.getElementById(pos);
		images.push(img.src);
	};
	carouselInterval = setInterval(carousel, 8000); // Change image every 8 seconds
	countingInterval = setInterval(start_counting, 1000);
	document.addEventListener("keydown", show ,false);
};

// Para seleccionar la imagen de mi slider.
function displayID(clicked){
	var change = clicked.src.replace(/^f.*[\\\/]/, '').split(".")[0];
	clicked.src = document.getElementById("imageType").src;
	document.getElementById("imageType").src = change + ".jpg";
	images = [];
	clearInterval(countingInterval); // para iniciar mi contador de nuevo
	clearInterval(carouselInterval); // para iniciar mi slider
	seconds = 0;
	hours = 0;
	minutes = 0;
	getValues();
}

// Funciones para mover mis imágenes.
function isEmpty1(){
	if (document.getElementById("pos2").src.replace(/^.*[\\\/]/, '') == "black.jpg"){
		document.getElementById("pos2").src = images[0];
		document.getElementById("pos1").src = images[1];
		images.swap(0, 1);
	} else if (document.getElementById("pos4").src.replace(/^.*[\\\/]/, '') == "black.jpg"){
		document.getElementById("pos4").src = images[0];
		document.getElementById("pos1").src = images[3];
		images.swap(0, 3);
	};
	checkWin();
};

function isEmpty2(){
	if (document.getElementById("pos1").src.replace(/^.*[\\\/]/, '') == "black.jpg"){
		document.getElementById("pos1").src = images[1];
		document.getElementById("pos2").src = images[0];
		images.swap(0, 1);
	} else if (document.getElementById("pos3").src.replace(/^.*[\\\/]/, '') == "black.jpg"){
		document.getElementById("pos3").src = images[1];
		document.getElementById("pos2").src = images[2];
		images.swap(1, 2);
	} else if (document.getElementById("pos5").src.replace(/^.*[\\\/]/, '') == "black.jpg"){
		document.getElementById("pos5").src = images[1];
		document.getElementById("pos2").src = images[4];
		images.swap(1, 4);
	};
	checkWin();
};

function isEmpty3(){
	if (document.getElementById("pos2").src.replace(/^.*[\\\/]/, '') == "black.jpg"){
		document.getElementById("pos2").src = images[2];
		document.getElementById("pos3").src = images[1];
		images.swap(1, 2);
	} else if (document.getElementById("pos6").src.replace(/^.*[\\\/]/, '') == "black.jpg"){
		document.getElementById("pos6").src = images[2];
		document.getElementById("pos3").src = images[5];
		images.swap(2, 5);
	};
	checkWin();
};

function isEmpty4(){
	if (document.getElementById("pos1").src.replace(/^.*[\\\/]/, '') == "black.jpg"){
		document.getElementById("pos1").src = images[3];
		document.getElementById("pos4").src = images[0];
		images.swap(0, 3);
	} else if (document.getElementById("pos5").src.replace(/^.*[\\\/]/, '') == "black.jpg"){
		document.getElementById("pos5").src = images[3];
		document.getElementById("pos4").src = images[4];
		images.swap(3, 4);
	} else if (document.getElementById("pos7").src.replace(/^.*[\\\/]/, '') == "black.jpg"){
		document.getElementById("pos7").src = images[3];
		document.getElementById("pos4").src = images[6];
		images.swap(3, 6);
	};
	checkWin();
};

function isEmpty5(){
	if (document.getElementById("pos2").src.replace(/^.*[\\\/]/, '') == "black.jpg"){
		document.getElementById("pos2").src = images[4];
		document.getElementById("pos5").src = images[1];
		images.swap(1, 4);
	} else if (document.getElementById("pos4").src.replace(/^.*[\\\/]/, '') == "black.jpg"){
		document.getElementById("pos4").src = images[4];
		document.getElementById("pos5").src = images[3];
		images.swap(3, 4);
	} else if (document.getElementById("pos6").src.replace(/^.*[\\\/]/, '') == "black.jpg"){
		document.getElementById("pos6").src = images[4];
		document.getElementById("pos5").src = images[5];
		images.swap(4, 5);
	} else if (document.getElementById("pos8").src.replace(/^.*[\\\/]/, '') == "black.jpg"){
		document.getElementById("pos8").src = images[4];
		document.getElementById("pos5").src = images[7];
		images.swap(4, 7);
	};
	checkWin();
};

function isEmpty6(){
	if (document.getElementById("pos3").src.replace(/^.*[\\\/]/, '') == "black.jpg"){
		document.getElementById("pos3").src = images[5];
		document.getElementById("pos6").src = images[2];
		images.swap(2, 5);
	} else if (document.getElementById("pos5").src.replace(/^.*[\\\/]/, '') == "black.jpg"){
		document.getElementById("pos5").src = images[5];
		document.getElementById("pos6").src = images[4];
		images.swap(4, 5);
	} else if (document.getElementById("pos9").src.replace(/^.*[\\\/]/, '') == "black.jpg"){
		document.getElementById("pos9").src = images[5];
		document.getElementById("pos6").src = images[8];
		images.swap(5, 8);
	};
	checkWin();
};

function isEmpty7(){
	if (document.getElementById("pos4").src.replace(/^.*[\\\/]/, '') == "black.jpg"){
		document.getElementById("pos4").src = images[6];
		document.getElementById("pos7").src = images[3];
		images.swap(3, 6);
	} else if (document.getElementById("pos8").src.replace(/^.*[\\\/]/, '') == "black.jpg"){
		document.getElementById("pos8").src = images[6];
		document.getElementById("pos7").src = images[7];
		images.swap(6, 7);
	};
	checkWin();
};

function isEmpty8(){
	if (document.getElementById("pos7").src.replace(/^.*[\\\/]/, '') == "black.jpg"){
		document.getElementById("pos7").src = images[7];
		document.getElementById("pos8").src = images[6];
		images.swap(6, 7);
	} else if (document.getElementById("pos5").src.replace(/^.*[\\\/]/, '') == "black.jpg"){
		document.getElementById("pos5").src = images[7];
		document.getElementById("pos8").src = images[4];
		images.swap(4, 7);
	} else if (document.getElementById("pos9").src.replace(/^.*[\\\/]/, '') == "black.jpg"){
		document.getElementById("pos9").src = images[7];
		document.getElementById("pos8").src = images[8];
		images.swap(7, 8);
	};
	checkWin();
};

function isEmpty9(){
	if (document.getElementById("pos8").src.replace(/^.*[\\\/]/, '') == "black.jpg"){
		document.getElementById("pos8").src = images[8];
		document.getElementById("pos9").src = images[7];
		images.swap(7, 8);
	} else if (document.getElementById("pos6").src.replace(/^.*[\\\/]/, '') == "black.jpg"){
		document.getElementById("pos6").src = images[8];
		document.getElementById("pos9").src = images[5];
		images.swap(5, 8);
	};
	checkWin();
};

function checkWin(){
	if(you_win()){
		highscore = String(hours) + ":" + String(minutes) + ":" + String(seconds);
		var win = document.createElement("img");
  	win.src = "winner.gif";
		win.id = "winner";
		win.width = window.innerWidth;
		win.height = window.innerHeight;
		win.setAttribute("onclick", "hideimage()");
		document.getElementById("slider").appendChild(win);
	};
};

function hideimage(){
	document.getElementById("slider").removeChild(document.getElementById("winner"));
	// hay que hacerlo condicional por si se supera el highscore
	var nickname = prompt("New Highscore! Write your name", "Your Name");
	if (nickname != "" && nickname != null) {
    player = nickname;
  } else {
		player = "no name (write yours the next time)";
	};
	// hay que hacerlo condicional por si se supera el highscore
	images = [];
	clearInterval(countingInterval); // para iniciar mi contador de nuevo
	seconds = 0;
	hours = 0;
	minutes = 0;
	getValues();
};

function showhighscore(){
	if (player == undefined){
		alert("No one has played yet!\n Try your best NOW");
	}else{
		alert("THE BEST PLAYER IS:\n\n" + player + "\nFinished in: " + highscore);
	}
}