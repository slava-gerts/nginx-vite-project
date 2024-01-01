import Tool from './Tool'

export default class Brush extends Tool {
  isMouseDown = false
  startX = 0
  startY = 0

  data = ''

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
    this.startX = e.pageX - target.offsetLeft
    this.startY = e.pageY - target.offsetTop

    this.data = this.canvas.toDataURL()
  }

  mouseMoveHandler(e: MouseEvent) {
    if (!this.isMouseDown) return

    const target = e.target as HTMLElement
    let currentX = e.pageX - target.offsetLeft
    let currentY = e.pageY - target.offsetTop
    this.draw(this.startX, this.startY, currentX - this.startX, currentY - this.startY)
  }

  draw(x: number, y: number, w: number, h: number) {
    const img = new Image()
    img.src = this.data

    img.onload = () => {
      this.context?.clearRect(0, 0, this.canvas.width, this.canvas.height)
      this.context?.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
      this.context?.beginPath()
      this.context?.rect(x, y, w, h)
      this.context?.fill()
      this.context?.stroke()
    }
  }
}