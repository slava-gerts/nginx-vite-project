import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './styles/app.scss'

const socket = new WebSocket('ws://localhost:5000/')
socket.onopen = () => {
  socket.send(JSON.stringify({
    method: 'connection',
    id: 555,
    username: 'John Newman'
  }))
}

socket.onmessage = event => {
  console.log(`You got a message from the server: ${event.data}`)
}

const onClick = () => {
  socket.send(JSON.stringify({
    message: 'A message from the client',
    method: 'message',
    id: 555,
    username: 'John Newman'
  }))
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <>
      <App />
      <button id='btn' onClick={onClick}>Send message</button>
    </>
  </React.StrictMode>,
)