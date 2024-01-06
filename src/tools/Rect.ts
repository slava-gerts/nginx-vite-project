import Tool from './Tool'

export default class Rect extends Tool {
  isMouseDown = false
  startX = 0
  startY = 0

  data = ''

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

  mouseUpHandler(e: MouseEvent) {
    this.isMouseDown = false

    const target = e.target as HTMLElement
    let currentX = e.pageX - target.offsetLeft
    let currentY = e.pageY - target.offsetTop
    this.socket.send(JSON.stringify({
      method: 'draw',
      id: this.sessionId,
      figure: {
        type: 'rect',
        x: this.startX,
        y: this.startY,
        width: currentX - this.startX,
        height: currentY - this.startY,
        color: this.context?.fillStyle,
      }
    }))
  }

  mouseDownHandler(e: MouseEvent) {
    this.isMouseDown = true
    this.context?.beginPath()

    const target = e.target as HTMLElement
    this.startX = e.pageX - target.offsetLeft
    this.startY = e.pageY - target.offsetTop

    this.data = this.canvas.toDataURL()
  }

  mouseMoveHandler(e: MouseEvent) {
    if (!this.isMouseDown) return

    const target = e.target as HTMLElement
    let currentX = e.pageX - target.offsetLeft
    let currentY = e.pageY - target.offsetTop
    this.draw(this.startX, this.startY, currentX - this.startX, currentY - this.startY, this.context?.fillStyle || 'black')
  }

  static draw(x: number, y: number, width: number, height: number, color: CanvasRenderingContext2D['fillStyle'], context?: CanvasRenderingContext2D | null) {
    if (!context) return
    
    context.fillStyle = color
    context.beginPath()
    context.rect(x, y, width, height)
    context.fill()
    context.stroke()
  }

  draw(x: number, y: number, width: number, height: number, color: CanvasRenderingContext2D['fillStyle']) {
    Rect.draw(x, y, width, height, color, this.context)
  }

  // draw(x: number, y: number, w: number, h: number) {
  //   const img = new Image()
  //   img.src = this.data

  //   img.onload = () => {
  //     this.context?.clearRect(0, 0, this.canvas.width, this.canvas.height)
  //     this.context?.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
  //     this.context?.beginPath()
  //     this.context?.rect(x, y, w, h)
  //     this.context?.fill()
  //     this.context?.stroke()
  //   }
  // }
}