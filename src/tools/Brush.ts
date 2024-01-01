import Tool from './Tool'

export default class Brush extends Tool {
  isMouseDown = false

  constructor(canvas: HTMLCanvasElement) {
    super(canvas)
    this.unlisten()
    this.listen()
  }

  listen() {
    this.canvas.onmousedown = this.mouseDownHandler.bind(this)
    this.canvas.onmouseup = this.mouseUpHandler.bind(this)
    this.canvas.onmousemove = this.mouseMoveHandler.bind(this)
  }

  unlisten() {
    this.canvas.onmousedown = null
    this.canvas.onmouseup = null
    this.canvas.onmousemove = null
  }

  mouseUpHandler() {
    this.isMouseDown = false
  }

  mouseDownHandler(e: MouseEvent) {
    this.isMouseDown = true
    this.context?.beginPath()

    const target = e.target as HTMLElement
    this.context?.moveTo(e.pageX - target?.offsetLeft, e.pageY - target?.offsetTop)
  }

  mouseMoveHandler(e: MouseEvent) {
    if (this.isMouseDown) {
      const target = e.target as HTMLElement
      this.draw(e.pageX - target?.offsetLeft, e.pageY - target?.offsetTop)
    }
  }

  draw(x: number, y: number) {
    this.context?.lineTo(x, y)
    this.context?.stroke()
  }
}