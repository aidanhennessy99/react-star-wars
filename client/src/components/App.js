import { BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom'
// import Button from 'react-bootstrap/Button';
import React, { Component } from 'react';
import SearchBar from './SearchBar';
import TravelList from './TravelList';
import PlanetInListDetail from './PlanetInListDetail'
import PlanetDetail from './PlanetDetail';
import Planets from './Planets';

class App extends Component {
    constructor(props) {
        super(props);       
        this.state = {
            planets: [],
            travelList: [],
            viewPlanetDetails: false,
            viewTravelList: false,
            viewSearchList: true
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
    fetch("/planets", {
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
    const {name, climate, terrain, gravity, population, diameter, surface_water } = planet;
    fetch('/planets', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({name, climate, terrain, gravity, population, diameter, surface_water }),
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
    this.setState({ travelList, viewPlanetDetails: false, viewTravelList: true })
    fetch('/planets/' + _id, { method: 'DELETE',
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

  {/* //Change button class to classname. */}
  {/* <div className="PageHeader"> */}
  <header class="navbar navbar-expand navbar-dark bg-primary flex-column flex-md-row bd-navbar">
  <a className="title" href="/" aria-label="Bootstrap">Star Wars Planets
</a>
  <div class="navbar-nav-scroll">
    <ul class="navbar-nav bd-navbar-nav flex-row">
      <li class="nav-item">
      <Link to="/"><a class="nav-link" onClick={() => this.setState({ viewTravelList: false, viewSearchList: true, viewPlanetDetails: false })}><font size="4" color="white">Search</font></a></Link>
      </li>
      <li class="nav-item">
      <Link to="/list"><a class="nav-link" onClick={() => this.setState({ viewTravelList: true, viewSearchList: false, viewPlanetDetails: false })}><font size="4" color="white">Trip List</font></a> </Link>
      </li>
  </ul>
  </div>
</header>

  {/* This is the Page Header that is colored in light blue and down below is the navbar with a search link and a travel list link.  */}
  {/* <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <a class="navbar-brand mr-0 mr-md-2" href="../assets/StarWarsLogo.jpg" aria-label="Bootstrap">
  <svg class="d-block" width="36" height="36" viewBox="0 0 612 612" xmlns="../assets/StarWarsLogo.jpg" focusable="false" role="img"><title>Bootstrap</title></svg>
</a>

  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNav">
    <ul class="navbar-nav">
      <li class="nav-item active">
      <Link to="/"><a class="nav-link" onClick={() => this.setState({ viewTravelList: false, viewSearchList: true, viewPlanetDetails: false })}><font size="6" color="white">Search</font></a> </Link>
      </li>
      <li class="nav-item">
      <Link to="/list"><a class="nav-link" onClick={() => this.setState({ viewTravelList: true, viewSearchList: false, viewPlanetDetails: false })}><font size="6" color="white">Trip List</font></a> </Link>
      </li>
    </ul>
  </div>
</nav> */}
  
  {/* </div> */}
  {/* Below is the content of the main page. The main page is also the search page, including the search bar. In the searchbar you can look up any planet in the Star Wars API. The index (/) route enables you to search for a planet while the index and name router (/:name) enables you to look up the details of the planet whose link you clicked on.  */}
  {this.state.viewSearchList && <div className="pageStyle"> 
  <font size="4">Welcome aboard the Millenium Falcon.</font>
      <ul>
      <li><h6> We are excited to take you to the planet of your choosing.  Please click on the searchbar and search for the planet you want to travel to. 
      </h6>
      <li><h6>Read the planet's details carefully and decide whether you want to add it to your travel list or not.</h6></li>
      <li><h6>You can remove planets from your list any time you change your mind.</h6></li>
     
      </li>
      </ul>
      
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
        </div> }
    {/* This link enables us to change the status of the viewTravelList array that decides whether we can view the list of planets in your trip list or not. The viewTravelList array is a boolean value that if false, will not allow your list to display. If true, it will display. */}
    
    {this.state.viewTravelList && <div className="pageStyle2"> 
          <h1>List Trip</h1>
          {/* the <TravelList ...> and the routes below, enables us to access the Travel List component that enables us to view our Travel List when this.state.viewTravelList is equal to true.  */}
          <Route path='/list' render={() => (
          <TravelList planets={this.state.planets} travelList={this.state.travelList} removeFromTravelList={this.removeFromTravelList} onClick={this.state.viewTravelList = false} onClick={this.state.viewPlanetDetails = true}/>
        )}/> 
               
        </div>}
        {/* <Link to="/list"> <button onClick={() => this.setState({ viewTravelList: false, viewSearchList: false,viewPlanetDetails: true })}>view Planet Details</button> </Link> */}
        {this.state.viewPlanetDetails && <div className="pageStyle3"> {this.state.viewTravelList = false}
        
       
             <Route path= '/list/:_id' render={(props) => (
      <PlanetInListDetail props={props} planets={this.state.planets} travelList={this.state.travelList} onClick={this.state.viewTravelList = true} onClick={this.state.viewPlanetDetails = false}/>      
 )}/>     

</div>  } 
      </div> 
    );
  }
} 
export default App;
