var MouseX, MouseY;
var time = 0;
var pictures = [new createPicture("ahThatsHotLeft.png", 30, 30), new createPicture("ahThatsHotRight.png", 600, 30), new createPicture("denisSchrei.png", 325, 200), new createPicture("erdogan.png", 262, 79), new createPicture("felixHae.png", 300, 60), new createPicture("jared.png", 250, 100), new createPicture("lukas.png", 170, 190), new createPicture("lukasUndPatrick.png", 85, 195), new createPicture("maximBlick.png", 40, 280), new createPicture("maximDoppelpeace.png", 40, 270), new createPicture("maximTUM.png", 202, 240), new createPicture("simonFame.png", 255, 50), new createPicture("victorUndSimon.png", 210, 75)]
document.onmousemove = getMousePos;
setInterval(update,10);


function getMousePos(event){
  time = 0;
  MouseX = event.clientX;
  MouseY = event.clientY;
  document.getElementById("container").innerHTML= "Koordinaten: " + MouseX + " " + MouseY;
}

function move(){
  if(MouseY>100){
    var now = pictures[Math.floor(Math.random()*pictures.length)];
    document.getElementById("picture").src = "Ressources/pictures/" + now.name;
    document.getElementById("picture").style.left = (MouseX-now.x) + "px";
    document.getElementById("picture").style.top = (MouseY-now.y) + "px";
  }else{
    document.getElementById("picture").style.left = "5px";
    document.getElementById("picture").style.top = "100px";
  }
}

function createPicture(name, x, y){
  this.name = name;
  this.x = x;
  this.y = y;
}

function update(){
  time += 1;
  if(time==50){
    move();
  }
}
