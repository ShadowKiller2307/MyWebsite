var r = 255;
var g = 0;
var b = 0;
var timer;
for(let i=1; i<4; i++){
  number(document.getElementById("p" + i));
}

function up(obj){
  obj.style.verticalAlign = "super";
  obj.style.fontSize = "20px";
  obj.style.textShadow = "2px 3px 5px black"
}

function down(obj){
  obj.style.verticalAlign = "baseline";
  obj.style.fontSize = "17px";
  obj.style.textShadow = "none"
}

function back(){
  document.getElementById("Kreis").style.fill = "#000000";
}

function updateMusic(){
   document.getElementById("music").src = "Ressources/songs/" + document.getElementById("sel").value;
}

function randomColors(){
  var red, green, blue;
  red = Math.floor(Math.random()*256);
  green = Math.floor(Math.random()*256);
  blue = Math.floor(Math.random()*256);
  document.getElementById("Kreis").style.fill = "rgb(" + red + ", " + green + ", " + blue + ")";
}

function rainbowColors(){

  if(r<255&&g==255&&b==0){
    r++;
  }

  if(r==255&&g>00&&b==0){
    g--;
  }

  if(r==255&&g==0&&b<255){
    b++;
  }

  if(r>0&&g==0&&b==255){
    r--;
  }

  if(r==0&&g<255&&b==255){
    g++;
  }

  if(r==0&&g==255&&b>0){
    b--;
  }

  document.getElementById("Kreis").style.fill = "rgb(" + r + ", " + g + ", " + b + ")";
}

function start(){
  timer = setInterval(rainbowColors, 10);
}
function stop(){
  clearInterval(timer);
}

function number(obj){
  var x = Math.random();
  x
  if(x>0.95){
    x = x + "  <-- Lel die ist sehr nah an 1 dran! :D";
  }

  if(x<0.05){
    x = x + "  <-- Lel die ist sehr nah an 0 dran! :D";
  }

  obj.innerHTML = x;
}
