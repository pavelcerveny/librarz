import React, { Component } from 'react';
import './Header.scss';

class Header extends Component {
  render() {
    return (
      <div className="header">
        <div className="title-row">
          <h2>Knihovna</h2>
        </div>
        <nav>
          <ul>
            <li className="nav-item-active"><a href="/">Naposledy přidané</a></li>
            <li><a href="/">Statistiky</a></li>
            <li><a href="/">Souhrn</a></li>
          </ul>
        </nav>
      </div>
    );
  }
}

export default Header;
