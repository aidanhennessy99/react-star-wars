const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PlanetSchema = new Schema({
  name: String,
  climate: String,
  terrain: String,
  population: String,
  diameter: String,
  surface_water: String
})

const Planet = mongoose.model('Planet', PlanetSchema);

module.exports = Planet;