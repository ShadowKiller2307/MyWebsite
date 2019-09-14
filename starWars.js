var canvas = document.getElementById("canvas");
var con = canvas.getContext("2d");
window.onload = function () {
  document.getElementsByClassName("text")[0].style.display = "none";
  con.canvas.width = window.innerWidth;
  con.canvas.height = window.innerHeight;
  con.shadowOffsetX = 0;
  con.shadowOffsetY = 0;
  con.shadowColor = "white";
  con.shadowBlur = 8;
  var galaxyCount = Math.floor(Math.random() * 3) + 4;
  con.fillStyle = "#FFFFFF";

  drawGalaxies(galaxyCount, con);
  drawRandomStars(60, con);
  setInterval(wait, 6000);
}

function wait() {
  showtext();
}

function showtext() {
  document.getElementsByClassName("intro")[0].style.display = "none";
  document.getElementsByClassName("text")[0].style.display = "table-cell";
  document.getElementsByClassName("fader")[0].style.display = "none";
  document.getElementsByClassName("fader")[0].style.animationDelay = "7s";
  document.getElementsByClassName("fader")[0].style.animationDuration = "9s"
  document.getElementsByClassName("fader")[0].style.display = "table-cell";
}

function drawGalaxies(count, con) {
  for (let c = 0; c < count; c++) {
    let posX = Math.random() * window.innerWidth;
    let posY = Math.random() * window.innerHeight;
    let starCount = Math.floor(Math.random() * 6) + 5;
    for (let i = 0; i < starCount; i++) {
      let offsetX = Math.random() * 60;
      let offsetY = Math.random() * 60;
      con.beginPath();
      con.arc(posX + offsetX, posY + offsetY, Math.random() * 2 + 1, 0, 2 * Math.PI);
      con.fill();
    }
  }
}

function drawRandomStars(count, con) {
  for (let i = 0; i < count; i++) {
    con.beginPath();
    con.arc(Math.random() * window.innerWidth, Math.random() * window.innerHeight, Math.random() * 2 + 1, 0, 2 * Math.PI);
    con.fill();
  }
}