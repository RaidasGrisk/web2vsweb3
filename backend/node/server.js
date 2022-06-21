const express = require('express')
const bodyParser= require('body-parser')
const MongoClient = require('mongodb').MongoClient
const cors = require('cors');

const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors({ origin: '*' }))
app.use(express.json())
app.use(function(req,res,next){setTimeout(next, 1000)});

const connectionString = 'mongodb+srv://Pu8z4tK6H5sU:a456asf645ass@cluster0.ejotl.gcp.mongodb.net/test?retryWrites=true&w=majority'

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


app.listen(8000, function() {
  console.log('listening on 8000')
})
