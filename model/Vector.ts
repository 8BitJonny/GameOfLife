export default class Vector {
  x: number;
  y: number;
  constructor (x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  add(scalar: number) {
    return new Vector(this.x + scalar, this.y + scalar)
  }

  mul(scalar: number) {
    return new Vector(this.x * scalar, this.y * scalar)
  }
}
