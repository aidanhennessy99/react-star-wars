import { Switch, Route} from 'react-router-dom'
import React, { Component } from 'react';
import Routes from './Routes';
import SearchBar from './SearchBar';
import TravelList from './TravelList';
import House from '../instagramPhoto/House.png'
import Lens from '../instagramPhoto/Lens3.png'
import ListPad from '../instagramPhoto/ListPad.png'


class App extends Component {
    constructor(props) {
        super(props);
        var tripData = this.fetchData();
        console.log(tripData);       
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
      this.setState({ travelList: this.state.travelList.concat(res) }) 
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

  removeFromTravelList = (_id) => {
    const i = this.state.travelList.findIndex(p => p._id === _id);
    const travelList = [
      ...this.state.travelList.slice(0, i),
      ...this.state.travelList.slice(i + 1),
    ];
    this.setState({ travelList })
    // const {_id, name, climate, terrain, population, diameter, surface_water } = planet;
    fetch('http://localhost:8000/planets/' + _id, { method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },  
      // body: JSON.stringify({_id, name, climate, terrain, population, diameter, surface_water }), 
    }).then(res => {     
      // this.setState({ travelList: this.state.travelList.splice(res) }) 
      console.log('TRAVEL LIST REDUCED: ', this.state.travelList)            
    });
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
    <nav>
      
  <div className="navWide">
    
          <a href="/home"><img src={House} width="100" height="100" /> </a>
          <a href="/planet"><img src={Lens} class="center" width="100" height="100" /> </a>
          <a href="/list"><img src={ListPad} class="right" width="100" height="100" /></a>
     
  
    </div>
</nav>
         
      <div className="pageStyle">
       <h5>Please enter a Star Wars Planet into the SearchBar below, click on the planet link that pops up, read the description and decide from there whether you want to go there or not.</h5>
        <h1>Planet</h1>
        <div>
          <SearchBar SearchPlanets={this.searchPlanetByName} />
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
            <Routes travelList={this.state.travelList} removeFromTravelList={this.removeFromTravelList} />
          )}/> 
        </Switch>      
        
      </div>
      </div>
      <div className="pageStyle2">
          <h1>List Trip</h1>
          <TravelList travelList={this.state.travelList} removeFromTravelList={this.removeFromTravelList}/>         
        
        </div>
        <div className="pageStyle3">
        <Switch>
        <Route exact path='/home' render={() => (
            <Routes planets={this.state.planets} />
          )}/>
          </Switch>
               
        </div>
      </div>

      
    );
  }
} 
export default App;