import { BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom'
import React, { Component } from 'react';
import SearchBar from './SearchBar';
import TravelList from './TravelList';
import Lens from '../instagramPhoto/Lens3.png'
import ListPad from '../instagramPhoto/ListPad.png';
import PlanetInListDetail from './PlanetInListDetail'
import PlanetDetail from './PlanetDetail';
import Planets from './Planets';

class App extends Component {
    constructor(props) {
        super(props);       
        this.state = {
            planets: [],
            travelList: [],
            viewTravelList: Boolean
        }      
    }
//This enables the fetchData two functions below to display planets from your database. 
    componentDidMount = () => {
      this.fetchData();
      
    }
    
//This enables you to get planets from the Star Wars API into your travelList array, which is the same array of planets as exists in your database. 
  addPlanet = (planet) => {
    this.setState({planets: this.state.planets.concat([planet])});
  }

//This returns all planets that are in your database as opposed to the Star Wars API database. 
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
      this.setState({ travelList: this.state.travelList.concat(res) }, () => console.log('CURRENT TRAVEL LIST: ', this.state.travelList))               
    })
   
  }

//This enables you to both post an item into your backend database as well your front end travelList array. 
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

//This enables you to delete a planet in both your travelList array and your backend data simultaneously. 
  removeFromTravelList = (_id) => {
    const i = this.state.travelList.findIndex(p => p._id === _id);
    const travelList = [
      ...this.state.travelList.slice(0, i),
      ...this.state.travelList.slice(i + 1),
    ];
    this.setState({ travelList })
    fetch('http://localhost:8000/planets/' + _id, { method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },  
    }).then(res => {     
      console.log('TRAVEL LIST REDUCED: ', this.state.travelList)            
    });
  }

//This enables you to search for a planet in the Star Wars API. It connects back to the SearchBar down below in the return section. 
  searchPlanetByName = (event) => {
    fetch('https://swapi.co/api/planets/?search='+ event.target.value)
    .then(response => response.json())
    .then(response => {
      console.log(response);
      this.setState({ planets: response.results }, () => {
        console.log(this.state.planets);
      });
      
    })  
}

  
render() {

    return (
<div>
  <div className="PageHeader">
  {/* This is the Page Header that is colored in light blue and down below is the navbar with a search link and a travel list link.  */}
    <nav>
      <div className="navWide">    
          {/* <a href="/"><img src={Lens} class="center" width="30" height="30" /><font size="12" color="white">Search</font></a> */}
          <Link to="/"><img src={Lens} class="center" width="30" height="30" /><button onClick={() => this.setState({ viewTravelList: false })}>Search</button> </Link>
          <Link to="/list"><img src={ListPad} class="right" width="30" height="30" /><button onClick={() => this.setState({ viewTravelList: true })}>ListPad</button> </Link>
          {/* <a href="/list" ><img src={ListPad} class="right" width="30" height="30" /><font size="12" color="white">ListPad</font></a> */}
      </div>
    </nav>
  </div>
  {/* Below is the content of the main page. The main page is also the search page, including the search bar. In the searchbar you can look up any planet in the Star Wars API. The index (/) route enables you to search for a planet while the index and name router (/:name) enables you to look up the details of the planet whose link you clicked on.  */}
  <div className="pageStyle">
      <h5>Welcome aboard the Millenium Falcon. We are excited to take you to the planet of your choosing. After clicking on the Searchbar, Please search for the planet you want to choose, look at the details that pop up and decide from there whether you want to add it to your travel list or not. If you choose to submit it, it will appear on your travel list that will appear when you click on the listpad. Hope you enjoy.
      </h5>
      <h5>Please enter a Star Wars Planet into the SearchBar below, click on the planet link that pops up, read the description and decide from there whether you want to go there or not.
      </h5> 
        <h1>Planet</h1>
        <div>
          <SearchBar SearchPlanets={this.searchPlanetByName} />
        </div>
        <div>
          <Router>
            <Switch>
         
          <Route exact path='/' render={() => (
            <Planets addPlanet={this.addPlanet} planets={this.state.planets} addToTravelList={this.addToTravelList} />
          )}/>
      
          <Route path='/:name' render={(props) => (
            <PlanetDetail props={props} addPlanet={this.addPlanet} planets={this.state.planets} addToTravelList={this.addToTravelList} />
          )}/>     
         
        </Switch> 
      </Router>     
      </div>
      </div>
    {/* This link enables us to change the status of the viewTravelList array that decides whether we can view the list of planets in your trip list or not. The viewTravelList array is a boolean value that if false, will not allow your list to display. If true, it will display. */}
    
     {this.state.viewTravelList && <div className="pageStyle2">
          <h1>List Trip</h1>
          {/* the <TravelList ...> and the routes below, enables us to access the Travel List component that enables us to view our Travel List when this.state.viewTravelList is equal to true.  */}
          <TravelList planets={this.state.planets} travelList={this.state.travelList} removeFromTravelList={this.removeFromTravelList}/>
          <Route path='/list' render={() => (
            <Planets planets={this.state.planets} />
          )}/> 
             <Route path= '/list/:_id' render={(props) => (
      <PlanetInListDetail props={props} travelList={this.state.travelList} />      
 )}/>     
        </div>}  
      </div>
    );
  }
} 
export default App;

