import React from 'react';
import axios from 'axios';
import MapComp from './MapComp';
import '../App.css';
import '../Styles/Rests.css';


const backup = {};
class Rests extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      restList: [],
    }
  }

  getRestList(){
    let lat;
    let lng;
    // get correct url if user entered a city
    if (this.props.latitude !== "" && this.props.latitude && this.props.changed){
      lat = this.props.latitude;
      lng = this.props.longitude;
    } else {
      lng = 38.029721599999995;
      lat = -78.5031168;
    }
    console.log(lat);
    axios
      // use our express server to request the google api
      .get(`http://localhost:9000/?lat=${lat}&lng=${lng}`)
      .then(res => {
        let tempRests = res.data.results.map(currRest => {
          // catch errors so one bad piece of data doesn't break the promise
          try {

            // construct restaurant object with relevant information
            let restObj = {
              name: currRest.name,
              rating: currRest.rating,
              price: currRest.price_level,
              open: currRest.opening_hours.open_now,
              lat: currRest.geometry.location.lat,
              lng: currRest.geometry.location.lng,
              types: currRest.types,
            }

            // check if the keyword is in the name of the restaurant
            // if not, return dummy data to be filtered out
            if (this.props.searchKey && this.props.searchKey !== ""){
              const currentName = restObj.name.toLowerCase();
              const currentSearchKey = this.props.searchKey.toLowerCase();
              
              if (!currentName.includes(currentSearchKey) && restObj.types.indexOf(currentSearchKey) === -1){
                return backup;
              }
            }
            return restObj;
          } catch(error) {
            console.log(error);
            return backup;
          }
          
        }).filter(rest => rest.open); // filter out restaurants that aren't open
          // update state so we can render
          this.setState({
          restList: tempRests,
        });
      })
      .catch(err => {
          console.log("Something went wrong with the request" + err);   
      });
  }

  componentDidMount(){
    this.getRestList();
  }


  buildHTML(){
        // put every restaurant into a format to be rendered
    let restDisplay = this.state.restList.map(rest => {
      let getStars = (rate) => {
        let stars = [];
        rate = Math.floor(rate);
        for (let i = 0; i < rate; i++){
          stars.push(<span key={Math.random()} className="fa fa-star checked"></span>);
        }
        for (let i = 0; i < 5 - rate; i++){
          stars.push(<span key={Math.random()} className="fa fa-star"></span>);
        }
        return stars;
      }
      let getPrice = (price) => {
        let dollars = [];
        if (price === "" || price === undefined){
          return "N/A";
        } 
        for (let i = 0; i < Math.floor(price); i++){
          dollars.push(<span key={Math.random()} className="fa fa-dollar myDolla"></span>);
        }
        return dollars;
      }
      return (
        <div key={Math.random() * 100} className="rest-info">
          <h2>{rest.name}</h2>
          <p>rating: 
            {getStars(rest.rating)}
          </p>
          <p>price: {getPrice(rest.price)}</p>
          <MapComp lat={rest.lat} lng={rest.lng}/>
        </div>
      ); 
    });
    return restDisplay;
  }


  render() {
    // create a list of restaurants with their maps
    if (this.props.changed){
      this.getRestList();
      this.props.revertChange();
    }

    // put restaurants in a nice format
    let rests = this.buildHTML();

    return (
      <div>
        {rests}
      </div>
    );
  }
}

export default Rests;
