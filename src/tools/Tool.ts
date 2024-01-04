export default class Tool {
  canvas: HTMLCanvasElement
  context: CanvasRenderingContext2D | null
  
  socket: WebSocket
  sessionId: string

  constructor(canvas: HTMLCanvasElement, socket: WebSocket, sessionId: string) {
    this.canvas = canvas
    this.context = canvas.getContext('2d')

    this.socket = socket
    this.sessionId = sessionId
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