/**
 * A Coords class that contains x and y coordinates
 *
 * @param {number} x - The x coordinate of a point
 * @param {number} y - The y coordinate of a point
 */
class Coords {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class Building {
  constructor(width, height, gap, posX) {
    this.width = width;
    this.height = height;
    this.gap = gap;
    this.posX = posX;
  }

  Move(dX) {
    this.posX += dX;
  }
  getWidth() {
    return this.width;
  }
  getHeight() {
    //use quadratic equation to scale height to this.posX value, -4x^2 + 1
    let h = -4 * this.height * Math.pow(this.posX, 2) + this.height;
    return h;
  }
  getGap() {
    return this.gap;
  }

  getPosXAdjusted() {
    let res = -4 * this.posX * Math.pow(this.posX, 4) + this.posX;
    return res;
  }

  getWidthPlusGap() {
    let t = this.width - this.gap;
    let wg = -4 * t * Math.pow(this.posX, 2) + t;
    return wg;
  }

  getPos() {}

  Update() {
    this.posX = this.posX - 0.00009;
    if (this.posX < -0.5) {
      this.posX = 0.5;
    }
  }
}
