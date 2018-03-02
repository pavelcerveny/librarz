import React, { Component } from 'react';
import './Search.scss';

class Search extends Component {
  render() {
    return (
      <div className="row">
        <div className="search">
          <input placeholder="vyhledat knihu..."/>
          <select className="btn">
            <option>Všechno</option>
            <option>Autor</option>
          </select>
          <button type="submit" className="btn search-button">
            <i className="fa fa-search" />
          </button>
        </div>
      </div>
    );
  }
}

export default Search;
