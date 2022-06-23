const express = require('express')
const bodyParser= require('body-parser')
const MongoClient = require('mongodb').MongoClient
const cors = require('cors')
require('dotenv').config()

const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
// app.use(cors({ origin: '*' }))
app.use(express.json())
// app.use(function(req,res,next){setTimeout(next, 1000)})

const mongo_acc = process.env.mongo_acc
const mongo_psw = process.env.mongo_psw
const connectionString = `mongodb+srv://${mongo_acc}:${mongo_psw}@cluster0.ejotl.gcp.mongodb.net/test?retryWrites=true&w=majority`

app.get('/', function (req, res) {
  res.send('Hey.')
})

MongoClient.connect(connectionString, (err, client) => {
  if (err) return console.error(err)
  console.log('Connected to Database')

  const db = client.db('web2vsweb3')

  app.get('/getMessages', function (req, res) {
    db.collection('messages').find().toArray().then(resp => {
      res.send(resp)
    })
  })

  app.post('/pushMessage', (req, res) => {
    console.log(req.body)
    db.collection('messages').insertOne(req.body).then(resp => {
      res.send('success')
    })
  })

})

const PORT = process.env.PORT || 8080
app.listen(PORT, function() {
  console.log(`listening on ${PORT}`)
})
