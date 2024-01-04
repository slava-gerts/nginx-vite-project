import {observer} from 'mobx-react-lite'
import React from 'react'

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

  const onMouseDown = () => {
    if (canvasRef.current) {
      canvasState.pushToUndo(canvasRef.current.toDataURL())
    }
  }

  const onSignIn = () => {
    canvasState.setUserName(usernameRef.current?.value || '')
    setShowModal(false)
  }

  return (
    <div className="canvas">
      <canvas onMouseDown={onMouseDown} ref={canvasRef} width={1400} height={700} />
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