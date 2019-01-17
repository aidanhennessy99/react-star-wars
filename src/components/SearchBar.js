import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from "react";
import PropTypes from 'prop-types';

class SearchBar extends Component {
  render() {
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