var minute = 0;
var savework = 0;
var tomat = 0;
var second = 0;
var work = 0;
var Stage = false;
var start = false;

function show(){
  minute = parseInt(work/60);
  second = parseInt(work%60);
  if (second>=10)
    document.getElementById('txt1').innerHTML = minute.toString() + ":" + second.toString();
  else
    document.getElementById('txt1').innerHTML = minute.toString() + ":0" + second.toString();
}

function Changetime() {
  Stage = false;
  savework = work = 25*60;
  start = true;
  show();
}

var timer = setInterval(
  window.onload = function() {
    document.getElementById('txt2').innerHTML = "Помидорки : "  + tomat.toString() + "/12";
    if (start){
      work--;
      if (work<=0) {
       soundClick();
       tomatos();
      }
     show();
    }
  },1000);
  
function tomatos(){
  if (!Stage){
    tomat++;
    document.getElementById('txt2').innerHTML = "Помидорки :"  + tomat.toString() + "/12";
    if (tomat == 12)
      alert ("Конец, ты устал");
      if (tomat%4 == 0){
        work = 30 * 60; 
      } else
        work = 5*60;
    } else{
      work = savework;
  }
  Stage = !Stage;
}

function soundClick() {
  var audio = new Audio(); 
  audio.src = 'music/click.mp3'; 
  audio.autoplay = true;
}

function litleinterval(){
  if (start){
    Stage = true;
    work = 5*60;
    show();
  }
}

function biginterval(){
  if (start){
    Stage = true;
    work = 30*60;
    show();
  }
}

function pause(){
    start = !start;
  if (!start)
    document.getElementById("bpause").value = "Продолжить";
  else
    document.getElementById("bpause").value = "Пауза";
}