import { Link } from 'react-router-dom'
import React from "react";
var baseURI = "../assets/"
var endURI=".PNG"




const PlanetDetail = ({props, planets, addToTravelList}) => {
  const {name} = props.match.params;
  const planet = planets.find(p => p.name === name)

  if (!planet) {
    return <div>Sorry But the Planet was not found<Link to='/'> Back</Link></div>;   
  }
  
  const handleClick = () => {
    addToTravelList(planet)
    props.history.push('/');
  }
  return (
      <div className="details">
        
        <img src = {baseURI + planet.name + endURI} alt="img" height="100" width="100"/>

          
        
        <h1>Name: {planet.name}</h1>    
        <h2>Climate: {planet.climate}</h2>
        <h3>Population: {planet.population}</h3>
        <h3>Terrain: {planet.terrain}</h3>
        <h4>Diameter: {planet.diameter}</h4>
        <h5>Surface Water: {planet.surface_water}</h5>
       {/* Handle Submit Click is going to be needed in this constant.  */}
        <button type="button" onClick={handleClick}>Add Planet to Travel List</button>
        <Link to='/'>Roster</Link>
      </div>

  )
};

export default PlanetDetail;
