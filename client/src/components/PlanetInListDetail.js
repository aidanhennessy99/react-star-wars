import { Link } from 'react-router-dom'
import React from "react";
var baseURI = "../assets/"
var endURI=  ".jpg";


//This constant allows us to view the details of planets in our trip list. 
const PlanetInListDetail = ({props, travelList}) => {
  const {_id} = props.match.params;
  console.log(_id)
  const TravelListPlanet = travelList.find(p => p._id === _id)
  console.log(TravelListPlanet)

  if (!TravelListPlanet) {
    return <div>Sorry But the Planet Details were not found<Link to='/list'> Back</Link></div>;   
  }
 
  return (
      <div className="details-of-List"> 
      {/* //The details that come back just like in the PlanetDetail component are an image, the name, climate, population, terrain, diameter and surface water of the planet. The big difference from PlaentDetail is that it does not have a button where you can add a new planet.    */}
           <img src = {baseURI + TravelListPlanet.name + endURI} alt="img" height="100" width="100"/>
        <h1>Name: {TravelListPlanet.name}</h1>    
        <h2>Climate: {TravelListPlanet.climate}</h2>
        <h3>Population: {TravelListPlanet.population}</h3>
        <h3>Terrain: {TravelListPlanet.terrain}</h3>
        <h4>Diameter: {TravelListPlanet.diameter}</h4>
        <h5>Surface Water: {TravelListPlanet.surface_water}</h5>
       {/* Handle Submit Click is going to be needed in this constant.  */}
        <Link to='/list'>Main Menu</Link>
      </div>

  )
};

export default PlanetInListDetail;