import "./styles.css";
import Player from "./components/player.js";
import Lanes from './components/lanes'
import Square from './components/square'
require('/lib/tracking')

window.onload = function() {

  let snow = document.getElementById("snowCover")

  let c = document.getElementById("secondCanvas")
  let ctx = c.getContext("2d")

  let canvas = document.getElementById('canvas')
  let context = canvas.getContext('2d')

  let video = document.getElementById('video')
  let videoStream = document.getElementById('videoStream')

  videoStream.width = window.innerWidth
  videoStream.height = window.innerHeight
  videoStream.addEventListener('loadedmetadata', () => {
    const dimensions =  videoDimensions(videoStream)
    canvas.height = dimensions.height
    canvas.width = dimensions.width
    c.height = dimensions.height
    c.width = dimensions.width
    snow.style.height = `${dimensions.height * 0.6}px`
    snow.style.width = `${dimensions.width}px`
    const top = (dimensions.height * 0.4) + 64
    snow.style.top = `${top}px`
    const left = (window.innerWidth - dimensions.width) / 2
    snow.style.left = `${left}px`

    console.log(dimensions.width, dimensions.height)
    init()
  })

  function videoDimensions(videoToFind) {
    // Ratio of the video's intrisic dimensions
    let videoRatio = videoToFind.videoWidth / videoToFind.videoHeight;
    // The width and height of the video element
    let width = videoToFind.offsetWidth, height = videoToFind.offsetHeight;
    // The ratio of the element's width to its height
    let elementRatio = width/height;
    // If the video element is short and wide
    if(elementRatio > videoRatio) width = height * videoRatio;
    // It must be tall and thin, or exactly equal to the original ratio
    else height = width / videoRatio;
    return {
      width: width,
      height: height
    };
  }

  let player, lanes, squares

  const init = () => {
    player = new Player(ctx, 25, canvas.height - 20, canvas.width / 10, canvas.height / 20);
    lanes = new Lanes(ctx, c);
    const midPoint = c.width / 2
    const height = c.height
    const chunk = c.width / 4
    squares = [
      new Square (midPoint - (chunk * 0.2), height * 0.4, 5, canvas.width / 20, midPoint - (chunk * 1.3), height, ctx),
      new Square (midPoint, height * 0.4, 5, canvas.width / 20, midPoint, height, ctx),
      new Square (midPoint + (chunk * 0.2), height * 0.4, 5, canvas.width / 20, midPoint + (chunk * 1.3), height, ctx),
    ]

    setInterval(() => {
      squares.filter(square => !square.alive)
        .forEach(deadSquare => {
          if (Math.random() >= 0.5) {
            deadSquare.reset()
          }
        })
    }, 2000)

    requestAnimationFrame(render)
  }

  let score = 0
  let lives = 3


  // function restart () {
  //   score = 0
  //   lives = 3
  //   document.getElementById('gameOver').style.display = 'none'
  //   window.requestAnimationFrame(render)
  // }

  let current = Date.now()
  let start = Date.now()
  let elapsed = 0

  function render () {
    current = Date.now()
    elapsed = current - start;
    start = current
    ctx.clearRect(0, 0, c.width, c.height)
    lanes.render()
    player.render()


    squares.filter(square => square.alive)
      .forEach(aliveSquare => {
        aliveSquare.update(1000 / elapsed)
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

  tracking.ColorTracker.registerColor('orange', function(r, g, b) {
    let { h, s, v } =  rgb2hsv(r, g, b)
    return ((h > 10 && h < 35) && (s > 50) && (v > 50))
  });
  let tracker = new tracking.ColorTracker(['orange']);
  // tracker.setMinGroupSize(70)
  // tracker.setMinDimension(50)

  tracker.on('track', function(event) {
    // context.clearRect(0, 0, canvas.width, canvas.height);
    event.data.forEach(function(rect) {
      // if (rect.color === 'custom') {
      //   rect.color = tracker.customColor;
      // }
      //
      context.strokeStyle = rect.color;
      context.strokeRect(rect.x, rect.y, rect.width, rect.height);
      context.font = '11px Helvetica';
      context.fillStyle = "#fff";
      context.fillText('x: ' + rect.x + 'px', rect.x + rect.width + 5, rect.y + 11);
      context.fillText('y: ' + rect.y + 'px', rect.x + rect.width + 5, rect.y + 22);
      player.move(rect.x + rect.width / 2, video.videoWidth, canvas.width)
    });
  });

  tracking.track('#video', tracker, { camera: true });
  if (navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({
      video:
        {
          // width: { max: canvas.width },
          // height: { max: canvas.height },
          facingMode: "environment",
        }
    })
      .then(function (stream) {
        videoStream.srcObject = stream;
      })
      .catch(function (error) {
        console.log(error)
        console.log("Something went wrong!");
      });
  }
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
