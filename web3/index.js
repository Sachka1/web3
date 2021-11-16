const express = require('express');
const fs = require('fs');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

app.get('/Deryabin', (req, res) => {
  res.sendFile(__dirname + '/Deryabin.html')
})

app.get('/Shurygina', (req, res) => {
  res.sendFile(__dirname + '/Shurygina.html')
})

app.use(express.static(__dirname + '/static'))

io.on('connection', (socket) => {
  socket.on('chat message', (data) => {
    io.emit('chat message', {
      message: data.message,
      name: data.name,
    })
    var cmnt = {
            name: data.name,
            comment: data.message
    }
    var json = JSON.stringify(cmnt)
    fs.readFile('./static/ok.json', 'utf-8', (err, data) =>{
        if(err) throw err
        var cmnts = JSON.parse(data)
        cmnts["comments"].push(cmnt)
        console.log(cmnts)
        fs.writeFileSync('./static/ok.json', JSON.stringify(cmnts))
    })
  })
})

http.listen(3000, () => {
  console.log('Сервер работает')
})
