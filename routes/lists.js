const router = require('express').Router();
const List = require('../models/list');
const Planet = require('../models/planet');

router.get('/lists', (req, res) => {
  List.find({}, (err, lists) => {
    if (err) throw err;
    res.send(JSON.stringify(lists));
  });
});

//ADD A BOARD TO AN ORGANIZATION

router.post('/lists/:id', (req, res) => {
    //make sure it's a valid mongo ID and won't trigger a cast error

  if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    //then find the matching organization
    List.findById(req.params.id, (err, list) => {
      if (err) throw err;

      //if no organization at that id, then tell the user
      if (!list) {
        return res.send(404, 'No such organization');

        //create a new board
      } else {
        console.log(req.body)
        let newPlanet = new Planet({
          name: req.body.name,
          climate: req.body.climate, 
          terrain: req.body.terrain,
          population: req.body.population,
          diameter: req.body.diameter,
          surface_water: req.body.surface_water
        });
        
        newPlanet.save();
        list.planets.push(newPlanet);
        list.save((err, savedLst) => {
          //populate the organization with its boards and send it
          List.findById(savedLst._id, (err, fullList) =>
            fullList.populate('planets', () => {
              if (err) throw err;
              res.send(JSON.stringify(fullList));
            })
          )
        });
  
      }

    })
    //if the object ID wasn't in the correct format
  } else {
  res.send(400, 'Send a valid object ID as a parameter');
}


})


module.exports = router;