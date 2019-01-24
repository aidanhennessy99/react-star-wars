import { Link } from 'react-router-dom';
import React from 'react';
import PropTypes from 'prop-types';
import PlanetInListDetail from './PlanetInListDetail';

//This is the constant that enables us to view the links to the planets on our travel list. 
const TravelList = ({travelList, removeFromTravelList}) => {
 
  //The removeFromTravelList function from App connects here. The handleClick feature is used on the button at the bottom.
   const handleClick = (_id) => {
        removeFromTravelList(_id)
          
      }
    return (
      <div className="lists">      
        <ul>
          {          
            travelList.map(p => (
              <li key={p._id} className="list">
      {/* //It returns the name of the planet as well as a details link that connects back to the details in the PlanetInListDetail component.       */}
               Name: {p.name}
                <br />               
                <Link to={`/list/${p._id}`}>Details   </Link> 
                {/* //This is the button that enables you to delete a planet from your trip list if you decide you do not want to go there. */}
                <button type="button" onClick={()=>handleClick(p._id)}> x </button>
            
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