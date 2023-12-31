import { ChangeEvent } from 'react'
import classNames from 'classnames'

import canvasState from 'store/canvasState'
import toolState from 'store/toolState'
import {Brush, Eraser, Rect} from 'tools'

import 'styles/toolbar.scss'

const ToolBar = () => {
  const onChangeColor = (e: ChangeEvent<HTMLInputElement>) => {
    toolState.setFillColor(e.target.value)
    toolState.setStrokeColor(e.target.value)
  }

  const onDownload = () => {
    const dataUrl = canvasState.canvas?.toDataURL()
    if (!dataUrl) return

    const link = document.createElement('a')
    link.href = dataUrl
    link.download = `${canvasState.sessionId}.jpg`
    document.body.appendChild(link)
    link.click()
    document.removeChild(link)
  }

  return (
    <div className={classNames('toolbar')}>
      <section className='toolbar__left'>
        <button className='toolbar__btn brush' onClick={() => toolState.setTool(new Brush(canvasState.canvas!, canvasState.socket!, canvasState.sessionId))}></button>
        <button className='toolbar__btn rect' onClick={() => toolState.setTool(new Rect(canvasState.canvas!, canvasState.socket!, canvasState.sessionId))}></button>
        <button className='toolbar__btn circle'></button>
        <button className='toolbar__btn eraser' onClick={() => toolState.setTool(new Eraser(canvasState.canvas!))}></button>
        <button className='toolbar__btn line'></button>
        <input onChange={onChangeColor} className='toolbar__palette' type='color' />
      </section>
      <section className='toolbar__right'>
        <button className='toolbar__btn undo' onClick={() => canvasState.undo()}></button>
        <button className='toolbar__btn redo' onClick={() => canvasState.redo()}></button>
        <button className='toolbar__btn save' onClick={onDownload}></button>
      </section>
    </div>
  );
};

export default ToolBar;