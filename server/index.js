const express = require('express')
const expressWs = require('express-ws')

const app = express()
const WSServer = expressWs(app)
const aWss = WSServer.getWss()

const PORT = process.env.PORT ?? 5000

app.ws('/', (ws, req) => {
  console.log('Connection established')
  ws.send('Connection established')

  ws.on('message', msg => {
    const parsedData = JSON.parse(msg)
    switch (parsedData.method) {
      case 'connection':
        onConnectionHandler(ws, parsedData)
        break
    }
  })
})

app.listen(PORT, () => console.log(`server started on port ${PORT}`))

onConnectionHandler = (ws, msg) => {
  ws.id = msg.id
  onBroadcastConnection(ws, msg)
}

onBroadcastConnection = (ws, msg) => {
  aWss.clients.forEach(client => {
    if (client.id === msg.id) {
      client.send(`User with name ${msg.username} connected`)
    }
  })
}