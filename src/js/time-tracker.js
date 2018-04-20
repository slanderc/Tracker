function Api() {
  var init, socket, timerId;
  socket = null;
  timerId = null;
  init = function () {
    var addr, protocol;
    socket = new WebSocket("ws://127.0.0.1:9393", 'echo-protocol');
    socket.onopen = function () {
      console.log("Соединение установлено.");
      if (timerId) {
        return clearInterval(timerId);
      }
    };
    socket.onclose = function (event) {
      console.log("Соединение закрыто.");
      return timerId = setInterval(function () {
        console.log('Попытка соединения');
        return init();
      }, 1000);
    };
    socket.onmessage = function (event) {
      var data;
      data = JSON.parse(event.data);
      console.log(data)
      if ('time' in data) {
        window.tt.work = Number(data.time);
        window.tt.start = 1;
        window.tt.changeLabelPause();
        window.tt.update();
      }
      else if ('command' in data && data.command === 'pause') {
        window.tt.start = data.state;
        window.tt.changeLabelPause();
      }
      return false;
    };
    return socket.onerror = function (error) {
      return console.log("Ошибка " + error.message);
    };
  };
  init();
  this.send = function (data) {
    socket.send(JSON.stringify(data));
  }
}
var api = new Api();

class tomattimetracker {
  constructor() {
    this.minute = 0;
    this.savework = 25 * 60;
    this.tomat = 0;
    this.second = 0;
    this.work = 25 * 60;
    this.Stage = 1;
    this.start = false;
  }

  show() {
    this.minute = parseInt(this.work / 60);
    this.second = parseInt(this.work % 60);
    var html = this.minute;
    if (!isNaN(html)) {
      if (this.second >= 10)
        html += ":" + this.second.toString();
      else
        html += ":0" + this.second.toString();
      document.getElementById('txt1').innerHTML = html
    }
  }

  Changetime() {
    api.send({
      command: 'setMinutes',
      minutes: 25 * 60
    })
    this.Stage = 0;
    localStorage.setItem('sstage', this.Stage);
    localStorage.setItem('Tomatos', 0);
    this.tomat = 0;
    this.start = true;
  }

  tomatos() {
    if (this.Stage == 1) {
      api.send({
        command: 'setMinutes',
        minutes: 25
      })
    } else {
      this.tomat++;
      document.getElementById('txt2').innerHTML = "Помидорки : " + this.tomat + "/12";
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
      api.send({
        command: 'setMinutes',
        minutes: 5 * 60
      })
    }
  }

  biginterval() {
    if (this.start) {
      api.send({
        command: 'setMinutes',
        minutes: 30 * 60
      })
    }
  }

  changeLabelPause() {
    document.getElementById("bpause").value = this.start ? "Пауза" : "Продолжить"
  }

  pauses() {
    api.send({
      command: "pause",
      state: !this.start
    })
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
      if (this.work <= 0) {
        this.soundClick();
        this.tomatos();
      }
      this.show();
    }
  }
}

var tt = new tomattimetracker();
// var timer = setInterval(
//     window.onload = function () {
//         tt.update();
//     }, 1000);

window.onload = function () {
  tt.savetomat = localStorage.getItem('Tomatos');
  tt.tomat = tt.savetomat;
  tt.show();
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

