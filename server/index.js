const express = require('express')
const expressWs = require('express-ws')
const cors = require('cors')
const fs = require('fs')
const path = require('path')

const app = express()
const WSServer = expressWs(app)
const aWss = WSServer.getWss()

const PORT = process.env.PORT ?? 5000

app.use(cors())
app.use(express.json())

app.ws('/', (ws, req) => {
  console.log('Connection established')

  ws.on('message', msg => {
    const parsedData = JSON.parse(msg)
    switch (parsedData.method) {
      case 'connection':
        onConnectionHandler(ws, parsedData)
        break
      case 'draw':
        onBroadcastConnection(ws, parsedData)
        break
    }
  })
})

app.post('/image', (req, res) => {
  try {
    const data = req.body.img.replace('data:image/png;base64,', '')
    fs.writeFileSync(path.resolve(__dirname, 'files', `${req.query.id}.jpg`), data, 'base64')
    return res.status(200).json('File saved successfully')
  } catch (e) {
    console.log(e)
    return res.status(500).json({message: 'Internal server error.'})
  }
})

app.get('/image', (req, res) => {
  try {
    const file = fs.readFileSync(path.resolve(__dirname, 'files', `${req.query.id}.jpg`))
    const data = 'data:image/png;base64,' + file.toString('base64')
    return res.status(200).json(data)
  } catch (e) {
    console.log(e)
    return res.status(500).json('Internal server error.')
  }
})

app.listen(PORT, () => console.log(`server started on port ${PORT}`))

onConnectionHandler = (ws, msg) => {
  ws.id = msg.id
  onBroadcastConnection(ws, msg)
}

onBroadcastConnection = (ws, msg) => {
  aWss.clients.forEach(client => {
    if (client.id === msg.id) {
      client.send(JSON.stringify(msg))
    }
  })
}