import { Link } from 'react-router-dom';
import React from 'react';
import PropTypes from 'prop-types';
import PlanetDetail from './PlanetDetail';


class Planets extends React.Component {
  render () { 
    return (
      <div className="planets"> 
        <ul>
          {          
            this.props.planets.map(p => (
              <li key={p.name}>
                <Link to={`/planet/${p.name}`}>{p.name}</Link>              
              </li>            
            ))
          }
        </ul> 
 
      </div>
    );
  }
}

Planets.propTypes = {
  planets: PropTypes.arrayOf(PropTypes.shape(PlanetDetail.propTypes)).isRequired
};


export default Planets;


