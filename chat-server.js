// *-----------
// HTTPサーバー
// ------------*

// HTTPサーバーを作成
const express = require('express')
const app = express()
const server = require('http').createServer(app)
const portNo = 3001
server.listen(portNo, () => {
  console.log('起動しました', 'http://localhost:' + portNo)
})

// publicディレクトリのファイルを自動で返す
app.use('/public', express.static('./public'))
// ルートへのアクセスはpublic/index.htmlへ
app.get('/', (req, res) => {
  res.redirect(302, '/public')
})

// Websocketサーバーを起動
const socketio = require('socket.io')
const io = socketio.listen(server)

// クライアントが接続したときの処理
io.on('connection', (socket) => {
  console.log('ユーザーが接続:', socket.client.id)
  // ユーザーがメッセージを受信した時の処理
  socket.on('chat-msg', (msg) => {
    console.log('メッセージ', msg)
    io.emit('chat-msg', msg)
  })
})
