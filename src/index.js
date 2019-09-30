import "./styles.css";
import Player from "./components/player.js";
import Lanes from './components/lanes'
import Square from './components/square'
require('/lib/tracking')

let c = document.getElementById("secondCanvas");
let ctx = c.getContext("2d");

const player = new Player(ctx);
const lanes = new Lanes(ctx);
const squares = [
  new Square (375, 5, 10, 50, 525, 475, ctx),
  new Square (375, 5, 10, 50, 525, 475, ctx),
  new Square (325, 5, 10, 50, 350, 475, ctx),
  new Square (325, 5, 10, 50, 350, 475, ctx),
  new Square (275, 5, 10, 50, 175, 475, ctx),
  new Square (275, 5, 10, 50, 175, 475, ctx),
  new Square (225, 5, 10, 50, 50, 475, ctx),
  new Square (225, 5, 10, 50, 50, 475, ctx),
]

let score = 0
let lives = 3

setInterval(() => {
  squares.filter(square => !square.alive)
    .forEach(deadSquare => {
      if (Math.random() >= 0.5) {
        deadSquare.reset()
      }
    })
}, 2000)

function restart () {
  score = 0
  lives = 3
  document.getElementById('gameOver').style.display = 'none'
  window.requestAnimationFrame(render)
}

  function render () {
  ctx.clearRect(0, 0, 600, 450)
  lanes.render()
  player.render()
    squares.filter(square => square.alive)
      .forEach(aliveSquare => {
        aliveSquare.update()
        if (player.x < aliveSquare.x + aliveSquare.width &&
          player.x + player.width > aliveSquare.x &&
          player.y < aliveSquare.y + aliveSquare.height &&
          player.y + player.height > aliveSquare.y) {
          console.log('dead')
          aliveSquare.collide()
          player.collide()
          lives--
          document.getElementById('livesValue').innerText = `${lives}`
        }
      })

    document.getElementById('scoreValue').innerText = `${score}`
    score++

    if(lives > 0) {
      window.requestAnimationFrame(render)
    } else {
      document.getElementById('gameOver').style.display = 'block'
    }
}
requestAnimationFrame(render)

window.onload = function() {
  let canvas = document.getElementById('canvas');
  let context = canvas.getContext('2d');

  tracking.ColorTracker.registerColor('orange', function(r, g, b) {
    let { h, s, v } =  rgb2hsv(r, g, b)
    return ((h > 10 && h < 35) && (s > 50) && (v > 50))
  });
  let tracker = new tracking.ColorTracker(['orange']);
  tracker.setMinGroupSize(70)
  tracker.setMinDimension(50)

  tracker.on('track', function(event) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    event.data.forEach(function(rect) {
      if (rect.color === 'custom') {
        rect.color = tracker.customColor;
      }

      context.strokeStyle = rect.color;
      context.strokeRect(rect.x, rect.y, rect.width, rect.height);
      context.font = '11px Helvetica';
      context.fillStyle = "#fff";
      context.fillText('x: ' + rect.x + 'px', rect.x + rect.width + 5, rect.y + 11);
      context.fillText('y: ' + rect.y + 'px', rect.x + rect.width + 5, rect.y + 22);
      player.move(rect.x, canvas.width)
    });
  });

  tracking.track('#video', tracker, { camera: true });
};

function rgb2hsv (r, g, b) {
  let rabs, gabs, babs, rr, gg, bb, h, s, v, diff, diffc, percentRoundFn;
  rabs = r / 255;
  gabs = g / 255;
  babs = b / 255;
  v = Math.max(rabs, gabs, babs),
    diff = v - Math.min(rabs, gabs, babs);
  diffc = c => (v - c) / 6 / diff + 1 / 2;
  percentRoundFn = num => Math.round(num * 100) / 100;
  if (diff == 0) {
    h = s = 0;
  } else {
    s = diff / v;
    rr = diffc(rabs);
    gg = diffc(gabs);
    bb = diffc(babs);

    if (rabs === v) {
      h = bb - gg;
    } else if (gabs === v) {
      h = (1 / 3) + rr - bb;
    } else if (babs === v) {
      h = (2 / 3) + gg - rr;
    }
    if (h < 0) {
      h += 1;
    }else if (h > 1) {
      h -= 1;
    }
  }
  return {
    h: Math.round(h * 360),
    s: percentRoundFn(s * 100),
    v: percentRoundFn(v * 100)
  };
}
