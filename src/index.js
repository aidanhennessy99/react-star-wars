import React from 'react';
import ReactDOM from 'react-dom';
import SearchBar from "./components/search_bar";

const App = () => {

  const planetSearch = (term) => {
    console.log(term)
  }

  return (
    <div>
      <SearchBar onSearchTermChange={planetSearch} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));