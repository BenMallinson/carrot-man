export default class Lanes {
  constructor(x, y) {
    this.x = x
    this.y = y
  }

  setLocation(x, y) {
    this.x = x
    this.y = y
  }

  render() {
    this.ctx.beginPath();
    this.ctx.rect(this.x, this.y, 50, 50);
    this.ctx.fill();
  }
}
