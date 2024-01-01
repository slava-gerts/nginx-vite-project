export default class Tool {
  canvas: HTMLCanvasElement
  context: CanvasRenderingContext2D | null

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas
    this.context = canvas.getContext('2d')
  }

  set fillColor(color: string) {
    if (this.context) {
      this.context.fillStyle = color
    }
  }

  set strokeColor(color: string) {
    if (this.context) {
      this.context.strokeStyle = color
    }
  }

  set lineWidth(width: number) {
    if (this.context) {
      this.context.lineWidth = width
    }
  }
}