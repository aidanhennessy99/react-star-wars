import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from "react";
import PropTypes from 'prop-types';

//This is the Searchbar class that makes the search bar possible. 
class SearchBar extends Component {
  render() {
    //The onChange feature in the return statement connects back to the SearchPlanets function that is in the <SearchBar ... /> in App.js
    return (
      <div className="search-bar">
        <input type="text"
            placeholder="search for a planet"
            onChange={this.props.SearchPlanets}>
          </input>               
      </div>     
    );
  }

  onInputChange(term) {
    this.setState({ term });
    this.props.onSearchTermChange(term);
  }
}

SearchBar.propTypes = {
  onSearchTermChange: PropTypes.func
}

export default SearchBar;