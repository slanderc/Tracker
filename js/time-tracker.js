class tomattimetracker {
  constructor() {
    this.minute = 0;
    this.savework = 25*60;
    this.tomat = 0;
    this.second = 0;
    this.work = 0;
    this.Stage = 1;
    this.start = false;
  }

  show() {
    this.minute = parseInt(this.work / 60);
    this.second = parseInt(this.work % 60);
    if (this.second >= 10)
      document.getElementById('txt1').innerHTML = this.minute.toString() + ":" + this.second.toString();
    else
      document.getElementById('txt1').innerHTML = this.minute.toString() + ":0" + this.second.toString();
  }

  Changetime() {
    this.Stage = 0;
    localStorage.setItem('sstage', this.Stage);
    localStorage.setItem('Tomatos', 0);
    this.tomat = 0;
    this.work = 25*60;
    this.start = true;
    this.show();
  }

  tomatos() {
    if (this.Stage == 1) {
      this.work = this.savework;
    }else {
      this.tomat++;
      document.getElementById('txt2').innerHTML = "Помидорки :" + this.tomat.toString() + "/12";
      if (this.tomat == 12) {
        alert("Конец, ты устал");
        this.Stage = 1;
        this.tomat = 0;
        this.start = false;
      }
        if (this.tomat % 4 == 0 && this.tomat > 1) {
          this.biginterval();
        } else {
          this.litleinterval();
        }
    } 
      localStorage.setItem('Tomatos', this.tomat);
      localStorage.setItem('sstage', this.Stage);
      if (this.Stage == 1)
        this.Stage = 0;
      else this.Stage = 1;        
  }

  soundClick() {
    var audio = new Audio();
    audio.src = 'music/click.mp3';
    audio.autoplay = true;
  }

  litleinterval() {
    if (this.start) {
      this.work = 5*60;
      this.show();
    }
  }

  biginterval() {
    if (this.start) {
      this.work = 30*60;
      this.show();
    }
  }

  pauses() {
    this.start = !this.start;
    if (!this.start)
      document.getElementById("bpause").value = "Продолжить";
    else
      document.getElementById("bpause").value = "Пауза";
  }

  oldtimer() {
    if (this.tomat != 0) {
      this.Stage = localStorage.getItem('sstage');
      if (this.Stage == 0)
        this.tomat--;
      this.start = true;
      this.tomatos();
    }
  }

  update() {
    document.getElementById('txt2').innerHTML = "Помидорки : " + this.tomat.toString() + "/12";
    if (this.start) {
      this.work--;
      if (this.work <= 0) {
        this.soundClick();
        this.tomatos();
      }
      this.show();
    }
  }
}

tt = new tomattimetracker();
var timer = setInterval(
    window.onload = function () {
        tt.update();
    }, 1000);

window.onload = function () {
  tt.savetomat = localStorage.getItem('Tomatos');
  tt.tomat = tt.savetomat;
  if (tt.tomat == 0) {
    document.getElementById("old").value = "Нет сохраненного таймера";
  }
  document.getElementById('change').onclick = function () {
    tt.Changetime();
  }
  document.getElementById('litle').onclick = function () {
    tt.litleinterval();
  }
  document.getElementById('bpause').onclick = function () {
    tt.pauses();
  }
  document.getElementById('old').onclick = function () {
    tt.oldtimer();
  }
  document.getElementById('big').onclick = function () {
    tt.biginterval();
  }
}

