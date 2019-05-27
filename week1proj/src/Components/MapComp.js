import React from 'react';
import '../Styles/MapComp.css';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';





class MapComp extends React.Component {

    render() {
        const position = [this.props.lat, this.props.lng];
 
        if (position[0] !== undefined){
            return (
            <div className="rest-map">

                <Map center={position} zoom={13} scrollWheelZoom={false}>
                  <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url='https://{s}.tile.osm.org/{z}/{x}/{y}.png'
                  />
                  <Marker position={position}>
                    <Popup>
                      A pretty CSS3 popup. <br/> Easily customizable.
                    </Popup>
                  </Marker>
                </Map>
            </div>
            );
        } else {
            return (<div></div>)
        }

      }
}

export default MapComp;
