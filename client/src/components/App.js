import { Switch, Route} from 'react-router-dom'
import React, { Component } from 'react';
import Routes from './Routes';
import SearchBar from './SearchBar';
import SearchBar2 from './SearchBar2';
import TravelList from './TravelList';


class App extends Component {
    constructor(props) {
        super(props);
       
        this.state = {
            planets: [],
            travelList: []
        }
        this.addPlanet = this.addPlanet.bind(this);
        this.fetchData = this.fetchData.bind(this);
        this.addToTravelList = this.addToTravelList.bind(this);
        this.removeFromTravelList = this.removeFromTravelList.bind(this)
        
    
      
    }

  addPlanet (planet) {
    this.setState({planets: this.state.planets.concat([planet])});
  }

  fetchData = () => {
    fetch("http://localhost:8000/planets", {
      method: "GET",
      dataType: "JSON",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      }
    })
    .then((res) => {
      return res.json()
    }) 
    .then((res) => {
      this.setState({ travelList: this.state.travelList.concat([res]) })    
      console.log('CURRENT TRAVEL LIST: ', this.state.travelList);                
    })
   
  }

  addToTravelList = (planet) => {
    const {name, climate, terrain, population, diameter, surface_water } = planet;
    fetch('http://localhost:8000/planets', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({name, climate, terrain, population, diameter, surface_water }),
  }).then(res => res.json()).then((res) => {
   
  this.setState({travelList: this.state.travelList.concat([res])}, () => {
      console.log('TRAVEL LIST UPDATED: ', this.state.travelList)
    })
  });
  }

  

  removeFromTravelList = (TravelListPlanet) => {
    const {name } = TravelListPlanet;
    fetch('http://localhost:8000/planets/:planet', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({name }) 
  }).then(res => res.text())
  .then(res => alert(res))
  console.log('TRAVEL LIST REDUCED: ', this.state.travelList)

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

  searchListByPage = (e) => {
  fetch('http://localhost:8000/planets?page='+ e.target.value)
    .then(response => response.json())
    .then(response => {
     //let searchResult = JSON.parse(responseBody).results;
      console.log(response);
      this.setState({ travelList: response }, () => {
      console.log(this.state.travelList);
    });
    
  })  
  }

  
render() {

    return (
    <div className="PageHeader">
      <h1>Welcome aboard the Millenium Falcon!</h1>      
      <div className="pageStyle">
       <h5>Please enter a Star Wars Planet into the SearchBar below, click on the planet link that pops up, read the description and decide from there whether you want to go there or not.</h5>
        <h1>Planet</h1>
        <div>
        <SearchBar SearchPlanets={this.searchPlanetByName} />
        <h1>List Trip</h1>
        <button onClick={this.fetchData}>GENERATE</button>
        <SearchBar2 SearchList={this.searchListByPage} />
            <TravelList travelList={this.state.travelList} />
        </div>
        <div>
        <Switch>
          <Route exact path='/' render={() => (
            <Routes planets={this.state.planets} />
          )}/>
          <Route path='/planet' render={() => (
            <Routes addPlanet={this.addPlanet} planets={this.state.planets} addToTravelList={this.addToTravelList} />
          )}/>     
            <Route path='/list' render={() => (
            <Routes travelList={this.state.travelList}  />
          )}/> 
        </Switch>      
        
      </div>
      </div>
     
      </div>
      
    );
  }
} 
export default App;