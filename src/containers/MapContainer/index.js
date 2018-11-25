import React, { Component } from 'react';

import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
} from "react-google-maps";

import config from '../../../config.json';

import MyMap from 'containers/MyMap';
import PlacesList from 'containers/PlacesList';

class MapСontainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            pos: {}
        }
    }

    componentDidMount() {
        this.getCurrentLocation()
    }

    getCurrentLocation() {
        navigator.geolocation.getCurrentPosition((position) => {
            let pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            this.setState({ pos })
        })
    }

    renderGoogleMap() {
        return (
            <MyMap
                pos={this.state.pos}
                googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${config.apiKey}&v=3.exp&libraries=geometry,drawing,places`}
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `400px`, width: '600px' }} />}
                mapElement={<div style={{ height: `100%` }} />} />
        )
    }

    render() {
        return (
            <div className="map-container">
                <div className="map-container__map">
                    {Object.keys(this.state.pos).length ? this.renderGoogleMap() : ''}
                </div>
                <div className="map-container__sidebar">
                    <PlacesList />
                </div>
            </div>
        )
    }
}

export default MapСontainer