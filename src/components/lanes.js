export default class Lanes {
  constructor(ctx) {
    this.lanes = []
    this.ctx = ctx
  }

  render() {
    this.ctx.strokeStyle = 'red';
    this.ctx.lineWidth = 10;
    this.ctx.beginPath()
    this.ctx.moveTo(0, 450);
    this.ctx.lineTo(200, -10);
    this.ctx.stroke()
    this.ctx.moveTo(150, 450);
    this.ctx.lineTo(250, -10);
    this.ctx.stroke()
    this.ctx.moveTo(300, 450);
    this.ctx.lineTo(300, -10);
    this.ctx.stroke()
    this.ctx.moveTo(450, 450);
    this.ctx.lineTo(350, -10);
    this.ctx.stroke()
    this.ctx.moveTo(600, 450);
    this.ctx.lineTo(400, -10);
    this.ctx.stroke()
  }
}
