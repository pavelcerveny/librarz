import React, { Component } from 'react';
import './Sidebar.scss';
import book from './003-open-book.png';
import setting from './if_User_Interface-23_2044265.png';
import add from './if_User_Interface-01_2044286.png';

class Sidebar extends Component {
  render() {
    return (
      <div className="sidebar">
        <ul>
          <li className="first-item"><img src={book} alt="" width={40} height={40}/></li>
          <li><img src={setting} alt="" width={60} height={60}/></li>
          <li><img src={add} alt="" width={60} height={60}/></li>
        </ul>
      </div>
    );
  }
}

export default Sidebar;
