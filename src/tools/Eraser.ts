import Brush from "./Brush"

export default class Eraser extends Brush {
  constructor(canvas: HTMLCanvasElement) {
    super(canvas)
  }

  draw(x: number, y: number) {
    if (this.context) {
      this.context.lineWidth = 10
      this.context.strokeStyle = 'white'
      super.draw(x, y)
    }
  }
}