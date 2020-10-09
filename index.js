// create canvas element and append it to document body
var canvas = document.createElement('canvas');
var info = document.createElement('div')
info.setAttribute('id', 'Info')
info.innerHTML = "TODO"
document.body.appendChild(canvas);
document.body.appendChild(info)


// some hotfixes... ( ≖_≖)
document.body.style.margin = 0;

// get canvas 2D context and set him correct size
var ctx = canvas.getContext('2d');
resize();

// last known position
var pos = { x: 0, y: 0 };

window.addEventListener('resize', resize);
document.addEventListener('mousemove', draw);
document.addEventListener('mousedown', setPosition);
document.addEventListener('mouseenter', setPosition);

// new position from mouse event
function setPosition(e) {
  pos.x = e.clientX;
  pos.y = e.clientY;
}

// resize canvas
function resize() {
  let canvasSize = Math.min(window.innerWidth, window.innerHeight);
  console.log(canvasSize);
  ctx.canvas.width = canvasSize;
  ctx.canvas.height = canvasSize;
}

function draw(e) {
  // mouse left button must be pressed
  if (e.buttons !== 1) return;
  console.log("drawing (debug)")

  ctx.beginPath(); // begin

  ctx.lineWidth = 5;
  ctx.lineCap = 'round';
  ctx.strokeStyle = '#c0392b';

  ctx.moveTo(pos.x, pos.y); // from
  setPosition(e);
  ctx.lineTo(pos.x, pos.y); // to

  ctx.stroke(); // draw it!
}
