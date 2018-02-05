import React, { Component } from 'react';
import Header from './header/Header';
import Sidebar from "./sidebar/Sidebar";
import Search from "./search/Search";
import './App.scss';

class App extends Component {
  render() {
    return (
      <div className="wrapper">
        <div className="page-col-1">
          <Sidebar />
        </div>
        <div className="page-col-2">
          <Header />
          <div className="content">
            <Search />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
