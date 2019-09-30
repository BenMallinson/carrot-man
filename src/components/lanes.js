export default class Lanes {
  constructor(ctx, canvas) {
    this.lanes = []
    this.ctx = ctx
    this.canvas = canvas
  }

  render() {
    const midPoint = this.canvas.width / 2
    const height =  this.canvas.height + 25
    const chunk =  this.canvas.width / 4
    this.ctx.strokeStyle = 'red';
    this.ctx.lineWidth = 5;
    this.ctx.beginPath()
    this.ctx.moveTo(midPoint - (chunk * 2), height);
    this.ctx.lineTo(midPoint, -10);
    this.ctx.stroke()
    this.ctx.moveTo(midPoint - chunk, height);
    this.ctx.lineTo(midPoint, -10);
    this.ctx.stroke()
    this.ctx.moveTo(midPoint, height);
    this.ctx.lineTo(midPoint, -10);
    this.ctx.stroke()
    this.ctx.moveTo(midPoint + chunk, height);
    this.ctx.lineTo(midPoint, -10);
    this.ctx.stroke()
    this.ctx.moveTo(midPoint + (chunk * 2), height);
    this.ctx.lineTo(midPoint , -10);
    this.ctx.stroke()
  }
}
