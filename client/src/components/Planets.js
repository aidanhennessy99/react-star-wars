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
//       <div class="d-flex flex-row bd-highlight mb-3">
//   <div class="p-2 bd-highlight">Flex item 1</div>
//   <div class="p-2 bd-highlight">Flex item 2</div>
//   <div class="p-2 bd-highlight">Flex item 3</div>
// < /div>
      <div className="card-columns">
      {/* <div className="list-unstyled">  */}
        
   
          {          
            this.props.planets.map(p => (
        
              
              <div key={p.name} className="card">
                  
                  <Link to={`/${p.name}`}><img src={baseURI + p.name + endURI} class="card-img-top"/></Link>
              <h6 className="card-title"><Link to={`/${p.name}`}>{p.name}</Link></h6>           
              </div>      
            ))
            
          }
 
          </div>
     
   
    );
  }
}

Planets.propTypes = {
  planets: PropTypes.arrayOf(PropTypes.shape(PlanetDetail.propTypes)).isRequired
};


export default Planets;


