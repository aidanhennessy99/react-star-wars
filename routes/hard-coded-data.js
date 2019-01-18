const router = require('express').Router()
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
        population: '2000000000',
        diameter: '12500',
        surface_water: '40'
    })

    lst1.planets.push(planet1);
   
    await lst1.save(); 
    await planet1.save();
    await res.end();
  
  })
  
  module.exports = router;