import React from 'react';
import Header from './layout/Header';
import SideNav from './layout/SideNav';
import EmailContent from './email/EmailContent';
import './App.css';
import TypographyMenu from './layout/TypographyMenu';

function App() {
  return (
    <div className="email-app">
      <Header />
      <div className="app-body">
        {/* <SideNav /> */}
        {/* <TypographyMenu /> */}
        <EmailContent />
      </div>
    </div>
  );
}

export default App;
