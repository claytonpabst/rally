require('dotenv').config()
const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
const socket = require('socket.io')
const massive = require('massive')
const pg = require('pg')
const pgSession = require('connect-pg-simple')(session)

const client = require('twilio')


let { SERVER_PORT, CONNECTION_STRING, CONNECTION_STRING_DEV, SESSION_SECRET, TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_NUMBER, STRIPE_SECRET } = process.env

const gc = require('./controllers/game_controller')
const uc = require('./controllers/user_controller')



const app = express()
app.use(bodyParser.json())

app.use(express.static(`${__dirname}/../build`))

const pgPool = new pg.Pool({
  connectionString: CONNECTION_STRING
})

app.use(session({
  store: new pgSession({
    pool: pgPool
  }),
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 10000000
  }
}))


massive(CONNECTION_STRING).then(db => {
  app.set('db', db)
  console.log(`Database Connected`)
}).catch(err => console.log(err))

// user controller

app.get('/api/playerList/:id', uc.playerList)
app.get('/api/friendsList/:id', uc.friendsList)
app.get('/api/getMyInfo/:id', uc.getMyInfo)
app.get('/api/playerProfile/:id', uc.playerProfile)
app.post('/api/addFriend/:id', uc.addFriend)
app.put('/api/submitProfileChanges/:id', uc.submitProfileChanges)

// game controller
app.get('/api/getFriendsToInvite/:id', gc.getFriendsToInvite)
app.get('/api/getInvite/:id', gc.getInvite)
app.get('/api/inviteList/:id', gc.inviteList)
app.post('/api/invite', gc.invite)



//SOCKETS

const io = socket(app.listen(SERVER_PORT, '0.0.0.0', () => console.log(`002 Server ready on port ${SERVER_PORT}`))
)


io.on('connection', function (socket) {
  socket.on('joinRoom', async room => {
    console.log('room', room)
    const db = app.get('db')
    // let messages = await db.chat.get_message_history({room: room})
    socket.join(room)
    // io.to(room).emit('sendMsg', messages)
  })

  socket.on('leaveRoom', function (roomName) {
    socket.leave(roomName)
  })

  socket.on('sendMsg', async data => {
    console.log(data)
    const { room, msg, user } = data;
    const db = app.get('db');
    await db.chat.create_message({ room: room, message: msg, user_name: user })
    // let messageReceived = {
    //   msg:data.msg,
    //   user: data.user,
    //   room: data.room
    // }
    let messages = await db.chat.get_message_history({ room: room })
    // console.log(room)
    io.to(data.room).emit('sendMsg', messages)
  })

  socket.on('scoreChanged', function (data) {
    io.to('scoreWatcher').emit('scoreChanged')
  })

  socket.on('oneScoreChanged', function (room) {
    io.to(room).emit('oneScoreChanged')
  })
})
