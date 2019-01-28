import { Link } from 'react-router-dom';
// import Button from 'react-bootstrap';
// import Card from 'react-ro-bootstrap';
import React from "react";
var baseURI = "../assets/"
var endURI=  ".jpg";



//This constant allows us to view the details of planets in our trip list. 
const PlanetInListDetail = ({props, travelList}) => {
  const {_id} = props.match.params;
  console.log(_id)
  const TravelListPlanet = travelList.find(p => p._id === _id)
  console.log(TravelListPlanet)
  var int = parseFloat(TravelListPlanet.gravity, 10);

  if (!TravelListPlanet) {
    return <div>Sorry But the Planet Details were not found<Link to='/list'> Back</Link></div>;   
  }
 
  return (
      <div className="card-columns"> 
             <h1>Planet Details</h1>
          <div className="card w-100">
        
         
      {/* //The details that come back just like in the PlanetDetail component are an image, the name, climate, population, terrain, diameter and surface water of the planet. The big difference from PlaentDetail is that it does not have a button where you can add a new planet.    */}
           <img src = {baseURI + TravelListPlanet.name + endURI} alt="img" class="card-img-top"/>
           
        <h5 className="card-text">Name: {TravelListPlanet.name}</h5>    
        <h5 className="card-text">Climate: {TravelListPlanet.climate}</h5>
        <h5 className="card-text">Population: {TravelListPlanet.population}</h5>
        <h5 className="card-text">Terrain: {TravelListPlanet.terrain}</h5>
        <h5 className="card-text">Gravity: {TravelListPlanet.gravity}</h5>
        <h5 className="card-text">A 200 pound person would weigh {200 * int} pounds on {TravelListPlanet.name}</h5>
        <h5 className="card-text">Diameter: {TravelListPlanet.diameter}</h5>
        <h5 className="card-text">Surface Water: {TravelListPlanet.surface_water}</h5>
        {/* <button value ="200">How much would a 200 pound person weigh on {TravelListPlanet.name}</button> */}
       {/* Handle Submit Click is going to be needed in this constant.  */}
        <Link to='/list'>Main Menu</Link>
  
      
      </div>
      </div>
      
 

  )
};

export default PlanetInListDetail;