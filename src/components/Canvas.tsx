import {observer} from 'mobx-react-lite'
import React, { useEffect } from 'react'

import canvasState from 'store/canvasState'
import toolState from 'store/toolState'
import Brush from 'tools/Brush'

import 'styles/canvas.scss'

const Canvas = observer(() => {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    canvasState.setCanvas(canvasRef.current)
    const toolByDefault = new Brush(canvasRef.current)
    toolState.setTool(toolByDefault)
  }, [canvasRef.current])

  const onMouseDown = () => {
    if (canvasRef.current) {
      canvasState.pushToUndo(canvasRef.current.toDataURL())
    }
  }


  return (
    <div className="canvas">
      <canvas onMouseDown={onMouseDown} ref={canvasRef} width={1400} height={700} />
    </div>
  );
});

export default Canvas;