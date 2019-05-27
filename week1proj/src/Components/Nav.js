import React from 'react';
import '../Styles/Nav.css';
import Rests from './Rests';
import AddressBar from './AddressBar';


// component to hold the title and search bars
class Nav extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            searchKey: "",
            changed: false,
            lat: "",
            lng: "",
        }
    }

    // set coordinates from the geocoding child and pass to Rests
    // closely coupled to sendKey because of 'changed' state -> should probably refactor later
    setCoordinates = (latitude, longitude) => {
        this.setState({
            lat: latitude,
            lng: longitude,
            changed: true,
        });
    }

    // continuously accumulate the key in the search bar
    accumulateKey = (event) => {
        this.setState({
            searchKey: event.target.value,
        });
        
    }

    // used as control for rendering when the search bar is used
    revertChange = () => {
        this.setState({
            changed: false,
        });
    }

    // function so that we can change the searchKey onClick
    sendKey = (event) => {
        this.setState({
            finalKey: this.state.searchKey,
            changed: true,
        });
    }

    render() {
        return (
            <div>
                <ul>
                    <li><h1 className="nav-title">Restaurants Near Me</h1></li>
                    <li className="search-label"><label>Search by Keyword: </label></li>
                    <li className="search-box">
                        <input type="text" value={this.state.searchKey} onChange={this.accumulateKey}/>
                    </li>
                    <li className="search-button"><button onClick={this.sendKey}>Search</button></li>
                    <AddressBar 
                        setCoordinates={this.setCoordinates} 
                    />
                </ul>
                <Rests 
                    latitude={this.state.lat} 
                    longitude={this.state.lng}
                    searchKey={this.state.searchKey} 
                    revertChange={this.revertChange} 
                    changed={this.state.changed}
                />
            </div>
        );
    }
}

export default Nav;