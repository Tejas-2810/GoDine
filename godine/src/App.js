import logo from './logo.svg';
import './App.css';
import React from 'react';
import Profile from './views/profile';

function App() {
  return (
    <div className="App">
      <Profile />
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Welcome to <code>GoDine</code>.
        </p>
        <i>
          Site Under Development.
        </i>
      </header> */}
    </div>
  );
}

export default App;
