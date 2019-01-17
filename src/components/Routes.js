import { Switch, Route } from 'react-router-dom'
import React from 'react';
import PlanetDetail from './PlanetDetail';
import AllPlanets from './AllPlanets';
import PlanetNew from './PlanetNew';

const Routes = ({planets, addPlanet, addToList}) => (
  <Switch>     
    <Route exact path='/' render={() => (
      <AllPlanets planets={planets} />
    )}/>
    <Route path='/planet/new' render={(props) => (
      <PlanetNew props={props} planets={planets} addPlanet={addPlanet} />
    )}/>
      <Route path= '/planet/:name' render={(props) => (
      <PlanetDetail props={props} planets={planets} addPlanet={addPlanet} addToList={addToList}/>     
    )}/>
    <Route path='/planets' render={(planets) => (
      <AllPlanets planets={planets} />
    )}/>
      
  </Switch>
)

  export default Routes