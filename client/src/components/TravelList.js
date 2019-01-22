import { Link } from 'react-router-dom';
import React from 'react';
import PropTypes from 'prop-types';
import PlanetInListDetail from './PlanetInListDetail';


const TravelList = ({travelList, removeFromTravelList}) => {

    // const {name} = props.match.params;
    // const travelList = planets.find(p => p.name === name)
  
    const handleClick = (_id) => {
        removeFromTravelList(_id)
          
      }
    return (
      <div className="lists">      
        <ul>
          {          
            travelList.map(p => (
              <li key={p._id} className="list">
             
               Name: {p.name}
                <br />               
                <Link to={`/list/${p._id}`}>Details   </Link> 
                
                <button type="button" onClick={handleClick}> x </button>
            
              </li>            
            ))
          }
        </ul> 
      </div>
    );
  }


TravelList.propTypes = {
  travelList: PropTypes.arrayOf(PropTypes.shape(PlanetInListDetail.propTypes)).isRequired
};


export default TravelList;