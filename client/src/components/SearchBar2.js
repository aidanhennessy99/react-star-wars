import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from "react";
import PropTypes from 'prop-types';

class SearchBar2 extends Component {
  render() {
    return (
      <div className="search-bar-2">
        <input type="text"
            placeholder="search in your trip list"
            onChange={this.props.SearchList}>
          </input>               
      </div>     
    );
  }

  onInputChange(term) {
    this.setState({ term });
    this.props.onSearchTermChange(term);
  }
}

SearchBar2.propTypes = {
  onSearchTermChange: PropTypes.func
}

export default SearchBar2;