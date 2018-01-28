import React, { Component } from 'react';
import './Sidebar.scss';

class Sidebar extends Component {
  render() {
    return (
      <div className="sidebar">
        <ul>
          <li><i className="fa fa-book" aria-hidden="true" /></li>
          <li><i className="fa fa-book" aria-hidden="true" /></li>
        </ul>
      </div>
    );
  }
}

export default Sidebar;
