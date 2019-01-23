import { Link } from 'react-router-dom'
import React from "react";


const PlanetInListDetail = ({props, travelList}) => {
  const {_id} = props.match.params;
  console.log(_id)
  const TravelListPlanet = travelList.find(p => p._id === _id)
  console.log(TravelListPlanet)

  if (!TravelListPlanet) {
    return <div>Sorry But the Planet was not found<Link to='/'> Back</Link></div>;   
  }
 
  return (
      <div className="details-of-List">   
            <img src={Image/TravelListPlanet.name.jpg}  alt="Img" height="100" width="100" />
        <h1>Name: {TravelListPlanet.name}</h1>    
        <h2>Climate: {TravelListPlanet.climate}</h2>
        <h3>Population: {TravelListPlanet.population}</h3>
        <h3>Terrain: {TravelListPlanet.terrain}</h3>
        <h4>Diameter: {TravelListPlanet.diameter}</h4>
        <h5>Surface Water: {TravelListPlanet.surface_water}</h5>
       {/* Handle Submit Click is going to be needed in this constant.  */}
        <Link to='/'>Main Menu</Link>
      </div>

  )
};

export default PlanetInListDetail;