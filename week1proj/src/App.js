import React from 'react';
import './App.css';
import Nav from './Components/Nav';


class App extends React.Component {



  render(){
    let bottomMargin = {
      margin: '5%',
    }
    return (
      <div className="App">
        <Nav/>
        <div style={bottomMargin}>Website built by Sammy Hecht with React, Leaflet, and Google Places</div>
      </div>
    );
  }
}

export default App;
