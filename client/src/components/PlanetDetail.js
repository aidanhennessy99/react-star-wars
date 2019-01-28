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
    <div class="card">
        <img src = {baseURI + planet.name + endURI} alt="img" class="card-img-top" />       
        <h5 className="card-text">Name: {planet.name}</h5>   
        <h5 className="card-text">Climate: {planet.climate}</h5>
        <h5 className="card-text">Population: {planet.population}</h5>
        <h5 className="card-text">Terrain: {planet.terrain}</h5>
        <h5 className="card-text">Gravity: {planet.gravity}</h5>
        <h5 className="card-text">Diameter: {planet.diameter}</h5>
        <h5 className="card-text">Surface Water: {planet.surface_water}</h5>
       {/* Handle Submit Click is going to be needed in this constant.  */}
       {/* This is the button that posts the planet to your travelList and your backend database. */}
        <button type="button" onClick={handleClick}>Add Planet to Travel List</button>
        <Link to='/'>Main Menu</Link>

        </div>
      </div>

  )
};

export default PlanetDetail;
