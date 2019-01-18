const router = require('express').Router();
const Planet = require('../models/planet');

//get all planets
router.get('/planets', (req, res) => {
    Planet.find({}, (err, planets) => {
      if (err) throw err;
      res.send(JSON.stringify(planets));
    });
  });