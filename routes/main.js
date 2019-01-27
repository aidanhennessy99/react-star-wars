const router = require('express').Router();
const cors = require('cors');
const express = require('express');
let app = express();
app.use(cors());
const List = require('../models/list');
const Planet = require ('../models/planet');

router.get('/generate-dummy-data', async (req, res) => {
    //1 organization
    const lst1 = new List({
        name: 'Project Shift',
        planets: []
    })
  
    //3 boards
    const planet1 = new Planet({
        name: 'Alderaan',
        climate: 'temperate',
        terrain: 'grasslands, mountains',
        gravity: '1 standard',
        population: '2000000000',
        diameter: '12500',
        surface_water: '40'
    })

    lst1.planets.push(planet1);
   
    await lst1.save(); 
    await planet1.save();
    await res.end();
  
  })

  router.get('/planets', (req, res, next) => {
    const perPage = 61
  
    // return the first page by default
    const page = req.query.page || 1
  
    Planet
      .find({})
      .skip((perPage * page) - perPage)
      .limit(perPage)
      .exec((err, planets) => {
        // Note that we're not sending `count` back at the moment, but in the future we might want to know how many are coming back
        Planet.count().exec((err, count) => {
          if (err) return next(err)
  
          res.send(planets)
        })
      })
  })

  router.post('/planets', (req, res, next) => {
    let planet = req.body
    //This will add an item to the database

        let newPlanet = new Planet ({
            name: planet.name,
            climate: planet.climate, 
            terrain: planet.terrain,
            gravity: planet.gravity,
            population: planet.population,
            diameter: planet.diameter,
            surface_water: planet.surface_water
        })
        newPlanet.save()
        res.send(newPlanet)
      
  })

  router.delete('/planets/:planet', (req, res, next) => {
    Planet.findByIdAndDelete(req.params.planet, (err, planet) =>{
        res.send(planet)
    })
  })

module.exports = router