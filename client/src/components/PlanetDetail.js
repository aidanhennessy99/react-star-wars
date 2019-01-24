import { Link } from 'react-router-dom'
import React from "react";
var baseURI = "../assets/"
var endURI=  ".jpg";



//This Component is meant to allow us to view the details of the planet we are searching for in the searchbar. It appears after you click on the planet's link. 
const PlanetDetail = ({props, planets, addToTravelList}) => {
  const {name} = props.match.params;
  const planet = planets.find(p => p.name === name)

  if (!planet) {
    return <div>Sorry But the Planet was not found<Link to='/'> Back</Link></div>;   
  }
  
  //This connects back to the addToTravelList function in app.js and the handleClick feature will activate the button at the bottom to connect directly towards App.js in posting a new planet to the travelList array and your back end database.
  const handleClick = () => {
    addToTravelList(planet)
    props.history.push('/');
  }
  return (
      <div className="details">
    {/* An image, the name, climate, population, terrain, diameter and surface water all appear when we click on the planet link to view details.      */}
        <img src = {baseURI + planet.name + endURI} alt="img" height="100" width="100"/>       
        <h1>Name: {planet.name}</h1>    
        <h2>Climate: {planet.climate}</h2>
        <h3>Population: {planet.population}</h3>
        <h3>Terrain: {planet.terrain}</h3>
        <h4>Diameter: {planet.diameter}</h4>
        <h5>Surface Water: {planet.surface_water}</h5>
       {/* Handle Submit Click is going to be needed in this constant.  */}
       {/* This is the button that posts the planet to your travelList and your backend database. */}
        <button type="button" onClick={handleClick}>Add Planet to Travel List</button>
        <Link to='/'>Roster</Link>
      </div>

  )
};

export default PlanetDetail;
