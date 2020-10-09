// create canvas element and append it to document body
var canvas = document.createElement('canvas');
var info = document.createElement('div')
var reset = document.createElement('button')
var flexContainer = document.createElement('div')

flexContainer.setAttribute('id', 'flex')

info.setAttribute('id', 'info')

reset.innerHTML = "Reset Canvas"

document.body.appendChild(flexContainer);
flexContainer.appendChild(canvas);
flexContainer.appendChild(info)
flexContainer.appendChild(reset)


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

function fetchPrediction() {
    const data = {};

    fetch('http://spell-org.spell-org.spell.services/spell-org/print-date-and-time/predict', {
          method: 'POST',
          headers: {
                  'Content-Type': 'application/json',
                },
          body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
          info.innerHTML = `Prediction is ${data.response}`
    })
    .catch((error) => {
          console.error('Error:', error);
    });
    return
}

// new position from mouse event
function setPosition(e) {
  pos.x = e.clientX;
  pos.y = e.clientY;
}

// resize canvas
function resize() {
  let canvasSize = Math.min(window.innerWidth, window.innerHeight);
  ctx.canvas.width = canvasSize;
  ctx.canvas.height = canvasSize;
}

function draw(e) {
  // mouse left button must be pressed
  if (e.buttons !== 1) return;

  ctx.beginPath(); // begin

  ctx.lineWidth = 5;
  ctx.lineCap = 'round';
  ctx.strokeStyle = '#c0392b';

  ctx.moveTo(pos.x, pos.y); // from
  setPosition(e);
  ctx.lineTo(pos.x, pos.y); // to

  ctx.stroke(); // draw it!
}

function clear() {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

window.setInterval(fetchPrediction, 3000); // hit the prediction endpoint every 3 s
reset.onclick = clear // clear the canvas
