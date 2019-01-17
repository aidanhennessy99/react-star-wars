import { Link } from 'react-router-dom'
import React, { Component } from 'react';

class PlanetNew extends Component {
  constructor (props) {
    super (props);

    this.state = {
      image_url: '',
      name: '',
      climate: '',
      terrain: '',
      population: '',
      diameter: '',
      surface_water: ''
    }

    this.handleSubmitPlanetClick = this.handleSubmitPlanetClick.bind(this);
  }

  handleSubmitPlanetClick () {
    const newPlanet = {
      image_url: this.state.image_url,
      name: this.state.name,
      climate: this.state.climate,
      terrain: this.state.terrain,
      population: this.state.population,
      diameter: this.state.diameter,
      surface_water: this.state.surface_water
    }

    this.props.addPlanet(newPlanet)
    this.props.props.history.push(`/`)
  }

  render () {
    return (
      <div>
        <form>

        <label>Image URL: </label>
        <input type='text' className='form-control' onChange={event =>
          this.setState({ image_url: event.target.value })
        } required />

        <br/>

        <label>Name: </label>
        <input type='text' className='form-control'onChange={event =>
          this.setState({ name: event.target.value })
        }/>

        <br/>

        <label>Climate: </label>
        <input type='text' className='form-control'onChange={event =>
          this.setState({ climate: event.target.value })
        }/>

        <br/>

        <label>Population: </label>
        <input type='text' className='form-control'onChange={event =>
          this.setState({ population: event.target.value })
        }/>

        <br/>

        <label>Terrain: </label>
        <input type='text' className='form-control'onChange={event =>
          this.setState({ terrain: event.target.value })
        }/>

        <br/>

        <label>Diameter: </label>
        <input type='text' className='form-control'onChange={event =>
          this.setState({ diameter: event.target.value })
        }/>

        <br/>


         <label>Surface Water: </label>
        <input type='text' className='form-control'onChange={event =>
          this.setState({ surface_water: event.target.value })
        }/>

        <br/>

        <button type="button" onClick={this.handleSubmitPlanetClick}>Submit</button>
        </form>

        <br/>

        <Link to='/'>Roster</Link>
  
      </div>
    )
  }
}

export default PlanetNew