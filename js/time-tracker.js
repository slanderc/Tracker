var minute = 0;
var savework = 25*60;
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
  localStorage.setItem('sstage', Stage);
  localStorage.setItem('Tomatos', 0);
  tomat = 0;
  work = 25*60;
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
    localStorage.setItem('Tomatos', tomat);
    document.getElementById('txt2').innerHTML = "Помидорки :"  + tomat.toString() + "/12";
    if (tomat == 12){
      alert ("Конец, ты устал");
      localStorage.setItem('Tomatos', 0);
      Stage = false;
      localStorage.setItem('sstage', Stage);
    }
      if (tomat%4 == 0 && tomat > 1){
        biginterval() 
      } else
        litleinterval()
    } else{
      work = savework;
      Stage = false;
  }
  //Stage = !Stage;
  localStorage.setItem('sstage', Stage);
}

function soundClick() {
  var audio = new Audio(); 
  audio.src = 'music/click.mp3'; 
  audio.autoplay = true;
}

function litleinterval(){
  if (start){
    Stage = true;
    localStorage.setItem('sstage', Stage);
    work = 5*60;
    show();
  }
}

function biginterval(){
  if (start){
    Stage = true;
    localStorage.setItem('sstage', Stage);
    work = 30*60;
    show();
  }
}

function pauses(){
      start = !start;
      if (!start)
        document.getElementById("bpause").value = "Продолжить";
      else
        document.getElementById("bpause").value = "Пауза";
}

function oldtimer(){
  if (tomat != 0){
  savestage = localStorage.getItem('sstage');
  Stage = savestage;
  start = true;
  if (!Stage)
    work = 25*60;
  if (Stage){
    if (tomat%4 == 0 && tomat > 1 ){
      biginterval();
    }
    else{
      litleinterval();  
    }
    }
  start = true;
  show();
}
}

window.onload = function () {
  savetomat = localStorage.getItem('Tomatos');
  tomat = savetomat;
  if (tomat == 0){
    document.getElementById("old").value = "Нет сохраненного таймера";
  }
}