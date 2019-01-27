const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
var cors = require('cors');
const URI = require('./config/index');

// mongoose.connect('mongodb://localhost/planets')
mongoose.connect(process.env.MONGOLAB_IVORY_URI || URI);

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

app.use(cors());

const mainRoutes = require('./routes/main')

app.use(express.static('client/build'));

app.use(mainRoutes)


app.listen(8000, () => {
  console.log('Node.js listening on port ' + 8000)
})