import Tool from './Tool'

export default class Brush extends Tool {
  isMouseDown = false

  constructor(canvas: HTMLCanvasElement, socket: WebSocket, sessionId: string) {
    super(canvas, socket, sessionId)
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
    this.socket.send(JSON.stringify({
      method: 'draw',
      id: this.sessionId,
      figure: {
        type: 'finish',
      }
    }))
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
      // this.draw(e.pageX - target?.offsetLeft, e.pageY - target?.offsetTop)
      this.socket.send(JSON.stringify({
        method: 'draw',
        id: this.sessionId,
        figure: {
          type: 'brush',
          x: e.pageX - target?.offsetLeft,
          y: e.pageY - target?.offsetTop,
        }
      }))
    }
  }

  draw(x: number, y: number) {
    Brush.draw(x, y, this.context)
  }

  static draw(x: number, y: number, context?: CanvasRenderingContext2D | null) {
    context?.lineTo(x, y)
    context?.stroke()
  }
}