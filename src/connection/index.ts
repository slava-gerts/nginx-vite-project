import {autorun} from 'mobx'

import canvasState from 'store/canvasState'

const SERVER_URL = 'ws://localhost:5000/'

export function initializeSideEffects() {
  autorun(() => {
    if (canvasState.username) {
      const socket = new WebSocket(SERVER_URL)
      const sessionId = window.location.pathname.slice(1)

      socket.onopen = () => {
        socket.send(JSON.stringify({
          id: window.location.pathname.slice(1),
          username: canvasState.username,
          method: 'connection',
        }))
      }

      socket.onmessage = (event: MessageEvent) => {
        const parsedMsg = JSON.parse(event.data)
        console.log(parsedMsg)
      }

      canvasState.setSessionId(sessionId)
      canvasState.setSocket(socket)
    }
  })
}