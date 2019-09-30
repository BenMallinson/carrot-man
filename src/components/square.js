export default class Square {
  constructor(x, y, size, maxSize, targetX, targetY, ctx) {
    this.x = x
    this.y = y
    this.width = size
    this.height = size
    this.scale =  1
    this.speed = 1
    this.startSize = size
    this.size = size
    this.maxSize = maxSize
    this.ctx = ctx
    this.targetX = targetX
    this.targetY = targetY
    this.startX = x
    this.alive = false

    this.update = this.update.bind(this)
    this.reset = this.reset.bind(this)
    this.collide = this.collide.bind(this)
  }

  collide () {
    this.alive = false
  }

  clamp (value, min, max) {
    return Math.min(Math.max(value, min), max);
  }

  reset () {
    this.x = this.startX
    this.y = 40
    this.scale = 1
    this.speed = 1
    this.alive = true
  }

  calculateAdjustments (start, max, modifier) {
    const difference = Math.abs(start -  max)
    if(start - max > 0) return start - (difference * modifier)
    return start + (difference * modifier)
  }

  update () {
    if (this.alive) {
      const clampedY = this.clamp(this.y / this.targetY, 0, 1)

      this.scale = clampedY * 4
      this.x = this.calculateAdjustments(this.startX, this.targetX, clampedY)
      this.y = this.y + this.scale
      let size = this.calculateAdjustments(this.startSize, this.maxSize, clampedY)
      this.size = size
      this.width = size
      this.height = size

      if(this.y >= this.targetY) {
        this.alive = false
      }
    }

    this.render()
  }

  render() {
    this.ctx.fillStyle = 'green'
    this.ctx.beginPath();
    this.ctx.rect(this.x, this.y, this.size, this.size);
    this.ctx.fill();
  }
}
