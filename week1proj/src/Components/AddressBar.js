import React from 'react';
import axios from 'axios';



class AddressBar extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            address: "",
        }
    }

    accumulateAddress = (event) => {
        this.setState({
            address: event.target.value,
        });
    }
    sendCoords = () => {
        let query = encodeURI(this.state.address);

        axios
            // make a request to our server with the specified city
            .get(`http://localhost:9000/geocode?city=${query}`)
            .then(res => {
                // get latitude and longitude of the city
                let lat = res.data.features[0].geometry.coordinates[0];
                let lng = res.data.features[0].geometry.coordinates[1];
                
                // pass coordinates back up
                this.props.setCoordinates(lat, lng);
            })
            .catch(err => {
                console.log("something went wrong with the city request " + err)
            });

    }

    render() {
        let styly = {
            visibility: 'hidden',
        }
        return (
            <div>
                <li><h1 className="nav-title" style={styly}>Restaurants Near Me REAl.</h1></li>
                <li className="search-label" >
                <label>Enter a City: </label>
                </li>
                <li className="search-box">
                <input type="text" value={this.state.address} onChange={this.accumulateAddress} />
                </li>
                <li className="search-button"><button onClick={this.sendCoords}>Search</button></li>
            </div>
        );
    }
}

export default AddressBar;