// const express = require('express')
// const bodyParser= require('body-parser')
// const MongoClient = require('mongodb').MongoClient
// const cors = require('cors')
// require('dotenv').config()
//
// const app = express()
// app.use(bodyParser.urlencoded({ extended: true }))
// app.use(cors({ origin: '*' }))
// app.use(express.json())
// // app.use(function(req,res,next){setTimeout(next, 1000)})
//
// const mongo_acc = process.env.mongo_acc
// const mongo_psw = process.env.mongo_psw
// const connectionString = `mongodb+srv://${mongo_acc}:${mongo_psw}@cluster0.ejotl.gcp.mongodb.net/test?retryWrites=true&w=majority`
//
// app.get('/', function (req, res) {
//   res.send('Hey.')
// })
//
// MongoClient.connect(connectionString, (err, client) => {
//   if (err) return console.error(err)
//   console.log('Connected to Database')
//
//   const db = client.db('web2vsweb3')
//
//   app.get('/getMessages', function (req, res) {
//     db.collection('messages').find().toArray().then(resp => {
//       res.send(resp)
//     })
//   })
//
//   app.post('/pushMessage', (req, res) => {
//     console.log(req.body)
//     db.collection('messages').insertOne(req.body).then(resp => {
//       res.send('success')
//     })
//   })
//
// })
//
// const PORT = process.env.PORT || 8080
// app.listen(PORT, () => {
//   console.log(`listening on ${PORT}`)
// })


/////////////////////////////////////
const MongoClient = require('mongodb').MongoClient
require('dotenv').config()
const cors = require('cors')

const express = require("express")
const app = express()

app.use(express.json({ extended: false }))
app.use(cors({ origin: '*' }))

// mongodb credentials
const mongo_acc = process.env.mongo_acc
const mongo_psw = process.env.mongo_psw
const connectionString = `mongodb+srv://${mongo_acc}:${mongo_psw}@cluster0.ejotl.gcp.mongodb.net/test?retryWrites=true&w=majority`
console.log(mongo_acc, mongo_psw)

app.get("/", async (req, res) => {
  res.send('Hey.')
})

// why do we make a separate connection with every request?
// vercel will make a new connection if this is done properly
// these connection will keep on growing until..?
// So, that is why we connect and close the cb conection on every request
app.get('/getMessages', (req, res) => {
  const client = new MongoClient(connectionString)
  client.connect((err) => {
   const db = client.db('web2vsweb3')
   db.collection('messages').find().toArray().then(resp => {
     client.close()
     res.send(resp)
   })
  })
})

app.post('/pushMessage', (req, res) => {
  const client = new MongoClient(connectionString)
  client.connect((err) => {
   const db = client.db('web2vsweb3')
   db.collection('messages').insertOne(req.body).then(resp => {
     client.close()
     res.send('success')
   })
  })
})


const PORT = process.env.PORT || 8080
app.listen(PORT, () => console.log(`Server is running in port ${PORT}`))
