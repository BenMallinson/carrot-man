export default class Player {
  constructor(ctx, x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width =  width;
    this.height = height;
    this.ctx = ctx;
    this.collided = false
    this.setLocation = this.setLocation.bind(this);
    this.collide = this.collide.bind(this)
    this.move = this.move.bind(this)
  }

  collide () {
    this.collided = true
    setTimeout(() => {
      this.collided = false
    }, 250)
  }

  move (trackingX, cameraWidth, canvasWidth) {
    if(((this.x - 5) < 0 && trackingX < (cameraWidth / 2)) || ((this.x + 5) > canvasWidth - 50 && trackingX > (cameraWidth / 2))) return
    if(trackingX < (cameraWidth / 4)) this.setLocation(this.x - (8 * devicePixelRatio), this.y)
    if(trackingX > (cameraWidth / 4)) this.setLocation(this.x + (8 * devicePixelRatio), this.y)
  }

  setLocation(x, y) {
    this.x = x
    this.y = y
  }

  render() {
    this.ctx.fillStyle = 'blue'
    if (this.collided) {
      this.ctx.fillStyle = 'red'
    }
    this.ctx.beginPath();
    this.ctx.rect(this.x, this.y, this.width, this.height);
    this.ctx.fill();
  }
}
