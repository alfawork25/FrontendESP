import './App.css';
import React from 'react';
import CheckPage from './components/CheckPage/CheckPage';
import { HashRouter } from 'react-router-dom';

function App() {


  return (
    <div className="App">
      <HashRouter>
        <CheckPage/>
      </HashRouter>
    </div>
  );
}

export default App;
