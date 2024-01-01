import {makeAutoObservable} from 'mobx'

class CanvasState {
  canvas: HTMLCanvasElement | null = null
  undoList: string[] = []
  redoList: string[] = []

  constructor() {
    makeAutoObservable(this)
  }

  setCanvas(canvas: HTMLCanvasElement) {
    this.canvas = canvas
  }

  pushToUndo(data: string) {
    this.undoList.push(data)
  }

  pushToRedo(data: string) {
    this.redoList.push(data)
  }

  private get canvasSize(): [number, number, number, number] {
    return [0, 0, this.canvas?.width ?? 0, this.canvas?.height ?? 0]
  }

  private drawImageFromData(data: string, context: CanvasRenderingContext2D | null | undefined) {
    const canvasSize = this.canvasSize
    const img = new Image()
    img.src = data
    img.onload = () => {
      context?.clearRect(...canvasSize)
      context?.drawImage(img, ...canvasSize)
    }
  }

  undo() {
    const context = this.canvas?.getContext('2d')

    if (this.undoList.length) {
      const data = this.undoList.pop()!
      this.redoList.push(this.canvas?.toDataURL()!)
      this.drawImageFromData(data, context)
    } else {
      context?.clearRect(...this.canvasSize)
    }
  }

  redo() {
    const context = this.canvas?.getContext('2d')
    if (!this.redoList.length) return

    const data = this.redoList.pop()!
    this.undoList.push(this.canvas?.toDataURL()!)
    this.drawImageFromData(data, context)
  }
}

export default new CanvasState()