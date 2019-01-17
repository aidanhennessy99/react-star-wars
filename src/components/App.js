import { Switch, Route} from 'react-router-dom'
import React, { Component } from 'react';
import Routes from './Routes';
import SearchBar from './SearchBar';


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            planets: [],
            travelList: []
        }
        this.addPlanet = this.addPlanet.bind(this);
        this.addToTravelList = this.addToTravelList.bind(this);
    }

  addPlanet (planet) {
    this.setState({planets: this.state.planets.concat([planet])});
  }

  addToTravelList(planet) {
    this.setState({travelList: this.state.travelList.concat([planet])}, () => {
      console.log('TRAVEL LIST UPDATED: ', this.state.travelList)
    })
  }


  searchPlanetByName = (event) => {
    fetch('https://swapi.co/api/planets/?search='+ event.target.value)
    .then(response => response.json())
    .then(response => {
      //let searchResult = JSON.parse(responseBody).results;
      console.log(response);
      this.setState({ planets: response.results }, () => {
        console.log(this.state.planets);
      });
      
    })  
}
  
render() {
    return (
    <div className="PageHeader">
      <h1>Welcome</h1>
      
      
      <div className="pageStyle">
       <h1>Planet</h1>
        <div>
        <SearchBar SearchPlanets={this.searchPlanetByName} />
        </div>
       
        <div>
        <Switch>
          <Route exact path='/' render={() => (
            <Routes addPlanet={this.addPlanet} planets={this.state.planets} addToList={this.addToTravelList} />
          )}/>
          <Route path='/planet' render={() => (
            <Routes addPlanet={this.addPlanet} planets={this.state.planets} addToList={this.addToTravelList} />
          )}/>     
        </Switch>      
      </div>
      </div>
     
      </div>
    );
  }
} 
export default App;