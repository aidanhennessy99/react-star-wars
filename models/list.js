const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//define our model
const ListSchema = new Schema({
  name: String,
  planets: [{ type: Schema.Types.ObjectId, ref: 'planet' }]
})

const List = mongoose.model('list', ListSchema);

module.exports = List;