import { Link } from 'react-router-dom';
import React from 'react';
import PropTypes from 'prop-types';
import PlanetInListDetail from './PlanetInListDetail';
var baseURI = "../assets/"
var endURI=  ".jpg";

//This is the constant that enables us to view the links to the planets on our travel list. 
const TravelList = ({travelList, removeFromTravelList}) => {
 
  //The removeFromTravelList function from App connects here. The handleClick feature is used on the button at the bottom.
   const handleClick = (_id) => {
        removeFromTravelList(_id)
          
      }
    return (
      <div className="lists">  
         
        <ul className="list-unstyled">
     
 
          {          
            travelList.map(p => (
              <li key={p._id} className="list">
      {/* //It returns the name of the planet as well as a details link that connects back to the details in the PlanetInListDetail component.       */}
      <div class="card w-50">
      <div className="card-body">
              
              <Link to={`/list/${p._id}`}><img src={baseURI + p.name + endURI} class="card-img-top" alt="img" width="100"/></Link>
              
               <br />
            
               <h5 className="card-title">Name: {p.name}</h5>
            
                <p className="card-text">  <Link to={`/list/${p._id}`}>Details   </Link> </p>
                {/* //This is the button that enables you to delete a planet from your trip list if you decide you do not want to go there. */}
                <button className="btn btn-primary" type="button" onClick={()=>handleClick(p._id)}> Remove From List </button>
                </div>
                </div>
           <br />
       
        
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