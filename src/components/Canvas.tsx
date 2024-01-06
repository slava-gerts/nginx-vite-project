import {observer} from 'mobx-react-lite'
import React from 'react'
import axios from 'axios'

import {ModalForm} from 'components/ModalForm'
import canvasState from 'store/canvasState'

import 'styles/canvas.scss'

const Canvas = observer(() => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null)
  const usernameRef = React.useRef<HTMLInputElement>(null)

  const [showModal, setShowModal] = React.useState(true)

  React.useEffect(() => {
    if (!canvasRef.current) return

    canvasState.setCanvas(canvasRef.current)
  }, [])

  React.useEffect(() => {
    if (!canvasState.sessionId) return

    axios.get(`http://localhost:5000/image?id=${canvasState.sessionId}`).then(response => {
      const img = new Image()
      img.src = response.data
      img.onload = () => {
        const context = canvasRef.current?.getContext('2d')
        context?.clearRect(0, 0, canvasRef.current?.width ?? 0, canvasRef.current?.height ?? 0)
        context?.drawImage(img, 0, 0, canvasRef.current?.width ?? 0, canvasRef.current?.height ?? 0)
      }
    })
  })

  const onMouseDown = () => {
    if (canvasRef.current) {
      canvasState.pushToUndo(canvasRef.current.toDataURL())
    }
  }

  const onMouseUp = () => {
    if (canvasRef.current) {
      axios.post(`http://localhost:5000/image?id=${canvasState.sessionId}`, {img: canvasRef.current.toDataURL()}).then(response => console.log(response.data))
    }
  }

  const onSignIn = () => {
    canvasState.setUserName(usernameRef.current?.value || '')
    setShowModal(false)
  }

  return (
    <div className="canvas">
      <canvas onMouseDown={onMouseDown} onMouseUp={onMouseUp} ref={canvasRef} width={1400} height={700} />
      <ModalForm className='modal' show={showModal}>
        <header>
          <h2>Enter your name:</h2>
        </header>
        <main>
          <input ref={usernameRef} type='text' />
        </main>
        <footer>
          <button onClick={onSignIn}>Sign in</button>
        </footer>
      </ModalForm>
    </div>
  );
});

export default Canvas;