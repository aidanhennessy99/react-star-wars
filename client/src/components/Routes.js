import { Switch, Route } from 'react-router-dom'
import React from 'react';
import PlanetDetail from './PlanetDetail';
import PlanetInListDetail from './PlanetInListDetail';
import Planets from './Planets';
import TravelList from './TravelList';
import Home from './Home';


const Routes = ({planets, addPlanet, addToTravelList, travelList, removeFromTravelList}) => (
  <Switch> 

      <Route exact path='/' render={() => (
      <Planets planets={planets} removeFromTravelList={removeFromTravelList}/>    
    )}/>    

      <Route path='/home' render={(props) => (
          <Home props={props}/>    
        )}/> 

       <Route path= '/planet/:name' render={(props) => (
      <PlanetDetail props={props} planets={planets} addPlanet={addPlanet} addToTravelList={addToTravelList} removeFromTravelList={removeFromTravelList}/>     
    )}/>

    <Route path= '/list/:_id' render={(props) => (
      <PlanetInListDetail props={props} travelList={travelList} removeFromTravelList={removeFromTravelList}/>     
    )}/>

    <Route path='/planets' render={(planets) => (
      <Planets planets={planets} removeFromTravelList={removeFromTravelList}/>
      
    )}/>

      <Route path='/lists' render={(travelList) => (
      <TravelList travelList={travelList} removeFromTravelList={removeFromTravelList}/>
      
    )}/>
      
  </Switch>
)

  export default Routes