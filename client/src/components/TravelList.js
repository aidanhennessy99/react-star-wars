import { Link } from 'react-router-dom';
import React from 'react';
import PropTypes from 'prop-types';
import PlanetInListDetail from './PlanetInListDetail';


class TravelList extends React.Component {
  render () { 
    return (
      <div className="lists">      
        <ul>
          {          
            this.props.travelList.map(p => (
              <li key={p._id} className="list">
             
               Name: {p.name}
                <br />               
                <Link to={`/list/${p._id}`}>Details</Link>    
                <br />         
              </li>            
            ))
          }
        </ul> 
      </div>
    );
  }
}

TravelList.propTypes = {
  travelList: PropTypes.arrayOf(PropTypes.shape(PlanetInListDetail.propTypes)).isRequired
};


export default TravelList;