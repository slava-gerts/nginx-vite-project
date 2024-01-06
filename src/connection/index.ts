import {autorun} from 'mobx'

import canvasState from 'store/canvasState'
import toolState from 'store/toolState'
import { Brush, Rect } from 'tools'

const SERVER_URL = 'ws://localhost:5000/'

export function initializeSideEffects() {
  autorun(() => {
    if (canvasState.username) onUsernameChanged()
  })
}

function onUsernameChanged() {
  if (!canvasState.canvas) return

  const socket = new WebSocket(SERVER_URL)
  const sessionId = window.location.pathname.slice(1)

  toolState.setTool(new Brush(canvasState.canvas, socket, sessionId))

  socket.onopen = () => {
    socket.send(JSON.stringify({
      id: window.location.pathname.slice(1),
      username: canvasState.username,
      method: 'connection',
    }))
  }

  socket.onmessage = onMessageHandler

  canvasState.setSessionId(sessionId)
  canvasState.setSocket(socket)
}

function onMessageHandler(event: MessageEvent) {
  const parsedMsg = JSON.parse(event.data)
  switch (parsedMsg.method) {
    case 'connection':
      console.log(`A user with name ${parsedMsg.username} connected`)
      break
    case 'draw':
      drawHandler(parsedMsg)
      break
  }
}

function drawHandler(msg: any) {
  const figure = msg.figure
  const context = canvasState.canvas?.getContext('2d')
  switch (figure.type) {
    case 'brush':
      Brush.draw(figure.x, figure.y, context)
      break
    case 'rect':
      Rect.draw(figure.x, figure.y, figure.width, figure.height, figure.color, context)
      break
    case 'finish':
      context?.beginPath()
  }
}