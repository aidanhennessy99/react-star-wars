import { Link } from 'react-router-dom';
import React from 'react';
import PropTypes from 'prop-types';
import PlanetDetail from './PlanetDetail';
var baseURI = "../assets/";
var endURI=  ".jpg";

//This class enables you to view the planet links based on what letters you enter into the searchbar. 
class Planets extends React.Component {
  render () { 
    return (
      <div className="planets"> 
        <ul>
          {          
            this.props.planets.map(p => (
              <li key={p.name}>
              
              <div class="card w-25">
                  <div className="card-body">
                  <Link to={`/${p.name}`}><img src={baseURI + p.name + endURI} class="card-img-top"/></Link>
              <h5 className="card-title"><Link to={`/${p.name}`}>{p.name}</Link></h5>    
              </div>
              </div>          
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


