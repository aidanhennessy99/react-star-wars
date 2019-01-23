import React, { Component } from 'react';
import House from '../instagramPhoto/House.png'
import Lens from '../instagramPhoto/Lens3.png'
import ListPad from '../instagramPhoto/ListPad.png'

class Home extends Component {
    constructor(props) {
        super(props);
              
        this.state = { 
        }    
    }
render() {
  return (
    <div className="HomePage">
      <nav>  
        <div className="HomeNavWide">
    
          <a href="/home"><img src={House} width="100" height="100" /> </a>
          <a href="/planet"><img src={Lens} class="center" width="100" height="100" /> </a>
          <a href="/list"><img src={ListPad} class="right" width="100" height="100" /></a> 
        </div>
      </nav>       
      <div className="HomePageStyle">
       <h5>Welcome aboard the Millenium Falcon. We are excited to take you to the planet of your choosing. After clicking on the Searchbar, Please search for the planet you want to choose, look at the details that pop up and decide from there whether you want to add it to your travel list or not. If you choose to submit it, it will appear on your travel list that will appear when you click on the listpad. Hope you enjoy.</h5>
        
       </div>
    </div>
      
    );
  }
}
export default Home