var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;

var OhDeokHoon = {
  x: 10,
  y: 200,
  width: 50,
  height: 50,
  draw() {
    ctx.fillStyle = "green";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  },
};

class Trash {
  constructor() {
    this.x = 500;
    this.y = 200;
    this.width = 50;
    this.height = 50;
  }
  draw() {
    ctx.fillStyle = "red";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

var timer = 0;
var trashs = [];

var Jump = false;
var JumpTimer = 0;
var animation;
var isGameOver = false;

function Move() {
  animation = requestAnimationFrame(Move);
  timer++;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (timer % 120 === 0) {
    var trash = new Trash();
    trashs.push(trash);
  }
  trashs.forEach((a, i, o) => {
    if (a.x < 0) {
      o.splice(i, 1);
    }
    a.x--;
    a.draw();

    Isover(OhDeokHoon, a);
  });
  if (Jump == true) {
    OhDeokHoon.y--;
    JumpTimer++;
  }
  if (Jump == false && OhDeokHoon.y < 200) {
    OhDeokHoon.y++;
  }
  if (JumpTimer > 100) {
    Jump = false;
    JumpTimer = 0;
  }

  OhDeokHoon.draw();
}
if (!isGameOver) {
  Move();
}

//충돌감지
function Isover(b, a) {
  var X_dist = a.x - (b.x + b.width);
  var Y_dist = a.y - (b.y + b.height);
  if (X_dist < 0 && Y_dist < 0) {
    console.log("Game Over");
    cancelAnimationFrame(animation);
    isGameOver = true;
  }
}

//스페이스바 점프
document.addEventListener("keydown", function (e) {
  if (e.code == "Space" && OhDeokHoon.y === 200) {
    Jump = true;
  }
});
