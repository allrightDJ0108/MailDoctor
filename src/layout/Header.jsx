import * as React from 'react';
import logo from '../images/logo.png';
import CustomizedInputBase from './CustomizedInputBase';

function Header() {
  return (
    <header className="app-header">
      <div className="header-left">
        {/* <img src={logo} alt="Logo" className="logo" />
        <span className="app-title">우리금융그룹</span> */}
      </div>
      <div className="header-center">
        {/* <CustomizedInputBase /> */}
        <img src={logo} alt="Logo" className="logo" />
        <span className="app-title">우리금융그룹</span>
      </div>
      <div className="header-right">
        <span className="user-icon">JS</span>
      </div>
    </header>
  );
}

export default Header;
