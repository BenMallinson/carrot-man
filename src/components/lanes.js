export default class Lanes {
  constructor(ctx, canvas) {
    this.lanes = []
    this.ctx = ctx
    this.canvas = canvas
  }

  render() {
    const midPoint = this.canvas.width / 2
    const height =  this.canvas.height + 25
    const chunk =  this.canvas.width / 5
    this.ctx.strokeStyle = 'black';
    this.ctx.lineWidth = 5;
    this.ctx.beginPath()
    this.ctx.moveTo(midPoint - (chunk * 2.5), height);
    this.ctx.lineTo(midPoint - chunk, height * 0.4);
    this.ctx.stroke()
    this.ctx.moveTo(midPoint - chunk, height);
    this.ctx.lineTo(midPoint - (chunk * 0.5), height * 0.4);
    this.ctx.stroke()
    this.ctx.moveTo(midPoint + chunk, height);
    this.ctx.lineTo(midPoint + (chunk * 0.5), height * 0.4);
    this.ctx.stroke()
    this.ctx.moveTo(midPoint + (chunk * 2.5), height);
    this.ctx.lineTo(midPoint + chunk, height * 0.4)
    this.ctx.stroke()
  }
}
